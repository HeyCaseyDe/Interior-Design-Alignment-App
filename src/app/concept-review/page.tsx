'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { SPACES } from '@/data/mockData';
import { ConceptImage, ImageFeedback } from '@/types';

// Mock concept images for Phase 2
const MOCK_CONCEPT_IMAGES: ConceptImage[] = [
  // Kitchen concepts
  { id: 'concept-k1', projectId: 'project-1', spaceId: 'kitchen', url: 'https://picsum.photos/seed/concept-kitchen1/600/400', alt: 'Modern Kitchen Concept A', tags: ['modern', 'white', 'marble', 'island'], phase: 2, isPublished: true, isDraft: false, createdAt: new Date() },
  { id: 'concept-k2', projectId: 'project-1', spaceId: 'kitchen', url: 'https://picsum.photos/seed/concept-kitchen2/600/400', alt: 'Modern Kitchen Concept B', tags: ['contemporary', 'dark', 'sleek', 'appliances'], phase: 2, isPublished: true, isDraft: false, createdAt: new Date() },
  { id: 'concept-k3', projectId: 'project-1', spaceId: 'kitchen', url: 'https://picsum.photos/seed/concept-kitchen3/600/400', alt: 'Modern Kitchen Concept C', tags: ['scandinavian', 'light-wood', 'bright', 'functional'], phase: 2, isPublished: true, isDraft: false, createdAt: new Date() },
  
  // Bedroom concepts
  { id: 'concept-b1', projectId: 'project-1', spaceId: 'primary-bedroom', url: 'https://picsum.photos/seed/concept-bedroom1/600/400', alt: 'Bedroom Concept A', tags: ['modern', 'neutral', 'comfortable', 'natural-light'], phase: 2, isPublished: true, isDraft: false, createdAt: new Date() },
  { id: 'concept-b2', projectId: 'project-1', spaceId: 'primary-bedroom', url: 'https://picsum.photos/seed/concept-bedroom2/600/400', alt: 'Bedroom Concept B', tags: ['luxury', 'elegant', 'rich-fabrics', 'warm'], phase: 2, isPublished: true, isDraft: false, createdAt: new Date() },
  
  // Bathroom concepts
  { id: 'concept-ba1', projectId: 'project-1', spaceId: 'primary-bath', url: 'https://picsum.photos/seed/concept-bathroom1/600/400', alt: 'Bathroom Concept A', tags: ['spa', 'natural-stone', 'relaxing', 'zen'], phase: 2, isPublished: true, isDraft: false, createdAt: new Date() },
  { id: 'concept-ba2', projectId: 'project-1', spaceId: 'primary-bath', url: 'https://picsum.photos/seed/concept-bathroom2/600/400', alt: 'Bathroom Concept B', tags: ['modern', 'glass', 'chrome', 'clean-lines'], phase: 2, isPublished: true, isDraft: false, createdAt: new Date() },
];

export default function ConceptReviewPage() {
  const router = useRouter();
  const { currentProject } = useAppContext();
  const [selectedSpace, setSelectedSpace] = useState('kitchen');
  const [feedback, setFeedback] = useState<Record<string, ImageFeedback>>({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const spaceImages = MOCK_CONCEPT_IMAGES.filter(img => img.spaceId === selectedSpace);
  const currentImage = spaceImages[currentImageIndex];
  const currentFeedback = currentImage ? feedback[currentImage.id] : null;

  const handleRatingChange = (imageId: string, rating: 'love' | 'like' | 'not_a_fan') => {
    setFeedback(prev => ({
      ...prev,
      [imageId]: {
        ...prev[imageId],
        id: `feedback-${imageId}`,
        projectId: currentProject?.id || 'project-1',
        imageId,
        rating,
        likedTags: prev[imageId]?.likedTags || [],
        dislikedTags: prev[imageId]?.dislikedTags || [],
        comment: prev[imageId]?.comment || '',
        createdAt: new Date(),
      }
    }));
  };

  const handleTagToggle = (imageId: string, tag: string, type: 'liked' | 'disliked') => {
    setFeedback(prev => {
      const current = prev[imageId] || {
        id: `feedback-${imageId}`,
        projectId: currentProject?.id || 'project-1',
        imageId,
        rating: 'like' as const,
        likedTags: [],
        dislikedTags: [],
        comment: '',
        createdAt: new Date(),
      };

      if (type === 'liked') {
        return {
          ...prev,
          [imageId]: {
            ...current,
            likedTags: current.likedTags.includes(tag)
              ? current.likedTags.filter(t => t !== tag)
              : [...current.likedTags.filter(t => t !== tag), tag],
            dislikedTags: current.dislikedTags.filter(t => t !== tag),
          }
        };
      } else {
        return {
          ...prev,
          [imageId]: {
            ...current,
            dislikedTags: current.dislikedTags.includes(tag)
              ? current.dislikedTags.filter(t => t !== tag)
              : [...current.dislikedTags.filter(t => t !== tag), tag],
            likedTags: current.likedTags.filter(t => t !== tag),
          }
        };
      }
    });
  };

  const handleCommentChange = (imageId: string, comment: string) => {
    setFeedback(prev => ({
      ...prev,
      [imageId]: {
        ...prev[imageId],
        id: `feedback-${imageId}`,
        projectId: currentProject?.id || 'project-1',
        imageId,
        rating: prev[imageId]?.rating || 'like',
        likedTags: prev[imageId]?.likedTags || [],
        dislikedTags: prev[imageId]?.dislikedTags || [],
        comment,
        createdAt: new Date(),
      }
    }));
  };

  const isImageComplete = (imageId: string) => {
    const imageFeedback = feedback[imageId];
    if (!imageFeedback || !imageFeedback.rating) return false;
    return imageFeedback.likedTags.length > 0 || imageFeedback.dislikedTags.length > 0 || imageFeedback.comment;
  };

  const allImagesComplete = MOCK_CONCEPT_IMAGES.every(img => isImageComplete(img.id));

  const handleSubmitFeedback = () => {
    // Save feedback to localStorage
    localStorage.setItem('phase2Feedback', JSON.stringify(feedback));
    
    // Navigate to status page showing phase 3 is ready
    alert('Phase 2 feedback submitted! Our designers will now refine the concepts based on your input.');
    router.push('/status');
  };

  const completedCount = MOCK_CONCEPT_IMAGES.filter(img => isImageComplete(img.id)).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Phase 2: Concept Review</h1>
              <p className="text-gray-600 mt-2">
                Review and provide feedback on your design concepts
              </p>
            </div>
            <div className="text-sm text-gray-600">
              {completedCount} of {MOCK_CONCEPT_IMAGES.length} images reviewed
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / MOCK_CONCEPT_IMAGES.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Space Navigation */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Spaces</h3>
            <div className="space-y-2">
              {SPACES.filter(space => 
                MOCK_CONCEPT_IMAGES.some(img => img.spaceId === space.id)
              ).map((space) => {
                const spaceImageCount = MOCK_CONCEPT_IMAGES.filter(img => img.spaceId === space.id).length;
                const spaceCompletedCount = MOCK_CONCEPT_IMAGES.filter(img => 
                  img.spaceId === space.id && isImageComplete(img.id)
                ).length;
                
                return (
                  <button
                    key={space.id}
                    onClick={() => {
                      setSelectedSpace(space.id);
                      setCurrentImageIndex(0);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedSpace === space.id
                        ? 'bg-blue-50 text-blue-900 border border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{space.name}</span>
                      {spaceCompletedCount === spaceImageCount ? (
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-xs text-gray-500">
                          {spaceCompletedCount}/{spaceImageCount}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Image Viewer */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            {currentImage ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    {SPACES.find(s => s.id === selectedSpace)?.name} - Concept {currentImageIndex + 1}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                      disabled={currentImageIndex === 0}
                      className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <span className="px-3 py-2 text-sm text-gray-600">
                      {currentImageIndex + 1} of {spaceImages.length}
                    </span>
                    <button
                      onClick={() => setCurrentImageIndex(Math.min(spaceImages.length - 1, currentImageIndex + 1))}
                      disabled={currentImageIndex === spaceImages.length - 1}
                      className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                <img
                  src={currentImage.url}
                  alt={currentImage.alt}
                  className="w-full h-96 object-cover rounded-lg mb-6"
                />

                {/* Rating */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">How do you feel about this concept?</h4>
                  <div className="flex gap-4">
                    {(['love', 'like', 'not_a_fan'] as const).map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleRatingChange(currentImage.id, rating)}
                        className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                          currentFeedback?.rating === rating
                            ? rating === 'love'
                              ? 'border-green-500 bg-green-50 text-green-800'
                              : rating === 'like'
                              ? 'border-blue-500 bg-blue-50 text-blue-800'
                              : 'border-red-500 bg-red-50 text-red-800'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          {rating === 'love' ? '❤️' : rating === 'like' ? '👍' : '👎'}
                          <div className="text-sm font-medium capitalize mt-1">
                            {rating.replace('_', ' ')}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">What do you like/dislike about this concept?</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium text-green-700 mb-2">Elements you like:</h5>
                      <div className="flex flex-wrap gap-2">
                        {currentImage.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleTagToggle(currentImage.id, tag, 'liked')}
                            className={`px-3 py-1 text-xs rounded-full transition-colors ${
                              currentFeedback?.likedTags.includes(tag)
                                ? 'bg-green-100 text-green-800 border border-green-300'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-red-700 mb-2">Elements you don't like:</h5>
                      <div className="flex flex-wrap gap-2">
                        {currentImage.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleTagToggle(currentImage.id, tag, 'disliked')}
                            className={`px-3 py-1 text-xs rounded-full transition-colors ${
                              currentFeedback?.dislikedTags.includes(tag)
                                ? 'bg-red-100 text-red-800 border border-red-300'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                No concepts available for this space
              </div>
            )}
          </div>

          {/* Feedback Panel */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Additional Feedback</h3>
            
            {currentImage && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comments for this image:
                  </label>
                  <textarea
                    value={currentFeedback?.comment || ''}
                    onChange={(e) => handleCommentChange(currentImage.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Share your thoughts about this concept..."
                  />
                </div>

                {/* Completion Status */}
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2">
                    {isImageComplete(currentImage.id) ? (
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <span className={`text-sm font-medium ${
                      isImageComplete(currentImage.id) ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {isImageComplete(currentImage.id) ? 'Feedback complete' : 'Rating + tags/comments required'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSubmitFeedback}
            disabled={!allImagesComplete}
            className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Submit All Feedback
          </button>
          
          {!allImagesComplete && (
            <p className="text-sm text-gray-600 mt-2">
              Please complete feedback for all images before submitting
            </p>
          )}
        </div>
      </div>
    </div>
  );
}