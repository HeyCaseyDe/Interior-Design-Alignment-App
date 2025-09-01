'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { SPACES } from '@/data/mockData';
import { ConceptImage, ImageFeedback } from '@/types';

// Mock final design images for Phase 3
const MOCK_FINAL_IMAGES: ConceptImage[] = [
  // Kitchen final designs
  { id: 'final-k1', projectId: 'project-1', spaceId: 'kitchen', url: 'https://picsum.photos/seed/final-kitchen1/700/500', alt: 'Refined Kitchen Design A', tags: ['modern', 'white', 'marble', 'refined'], phase: 3, isPublished: true, isDraft: false, createdAt: new Date() },
  { id: 'final-k2', projectId: 'project-1', spaceId: 'kitchen', url: 'https://picsum.photos/seed/final-kitchen2/700/500', alt: 'Refined Kitchen Design B', tags: ['elegant', 'sophisticated', 'functional', 'timeless'], phase: 3, isPublished: true, isDraft: false, createdAt: new Date() },
  
  // Bedroom final designs
  { id: 'final-b1', projectId: 'project-1', spaceId: 'primary-bedroom', url: 'https://picsum.photos/seed/final-bedroom1/700/500', alt: 'Refined Bedroom Design A', tags: ['serene', 'comfortable', 'modern', 'calming'], phase: 3, isPublished: true, isDraft: false, createdAt: new Date() },
  { id: 'final-b2', projectId: 'project-1', spaceId: 'primary-bedroom', url: 'https://picsum.photos/seed/final-bedroom2/700/500', alt: 'Refined Bedroom Design B', tags: ['luxury', 'warm', 'sophisticated', 'cozy'], phase: 3, isPublished: true, isDraft: false, createdAt: new Date() },
  
  // Bathroom final designs
  { id: 'final-ba1', projectId: 'project-1', spaceId: 'primary-bath', url: 'https://picsum.photos/seed/final-bathroom1/700/500', alt: 'Refined Bathroom Design A', tags: ['spa-like', 'natural', 'zen', 'sophisticated'], phase: 3, isPublished: true, isDraft: false, createdAt: new Date() },
];

export default function FinalReviewPage() {
  const router = useRouter();
  const { currentProject } = useAppContext();
  const [selectedSpace, setSelectedSpace] = useState('kitchen');
  const [feedback, setFeedback] = useState<Record<string, ImageFeedback>>({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [approvedImages, setApprovedImages] = useState<Set<string>>(new Set());

  const spaceImages = MOCK_FINAL_IMAGES.filter(img => img.spaceId === selectedSpace);
  const currentImage = spaceImages[currentImageIndex];
  const currentFeedback = currentImage ? feedback[currentImage.id] : null;

  const handleRatingChange = (imageId: string, rating: 'love' | 'like' | 'not_a_fan' | 'approved') => {
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

    if (rating === 'approved') {
      setApprovedImages(prev => new Set([...prev, imageId]));
    } else {
      setApprovedImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(imageId);
        return newSet;
      });
    }
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

  const getSpaceApprovalStatus = (spaceId: string) => {
    const spaceImageIds = MOCK_FINAL_IMAGES.filter(img => img.spaceId === spaceId).map(img => img.id);
    return spaceImageIds.some(id => approvedImages.has(id));
  };

  const allSpacesApproved = SPACES.filter(space => 
    MOCK_FINAL_IMAGES.some(img => img.spaceId === space.id)
  ).every(space => getSpaceApprovalStatus(space.id));

  const handleFinalSubmit = () => {
    // Save approvals and feedback
    localStorage.setItem('phase3Feedback', JSON.stringify(feedback));
    localStorage.setItem('approvedImages', JSON.stringify([...approvedImages]));
    
    // Show completion message
    alert('Congratulations! Your interior design project is now complete. Your final design package will be delivered shortly.');
    
    // Navigate to completion page
    router.push('/complete');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Phase 3: Final Design Review</h1>
              <p className="text-gray-600 mt-2">
                Review your refined designs and approve the ones you love
              </p>
            </div>
            <div className="text-sm text-gray-600">
              {approvedImages.size} images approved
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-4 flex items-center gap-4">
            {SPACES.filter(space => 
              MOCK_FINAL_IMAGES.some(img => img.spaceId === space.id)
            ).map((space) => (
              <div key={space.id} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${
                  getSpaceApprovalStatus(space.id) ? 'bg-green-500' : 'bg-gray-300'
                }`} />
                <span className="text-sm text-gray-600">{space.name}</span>
              </div>
            ))}
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
                MOCK_FINAL_IMAGES.some(img => img.spaceId === space.id)
              ).map((space) => {
                const isApproved = getSpaceApprovalStatus(space.id);
                
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
                      {isApproved ? (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-xs text-green-600">Approved</span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-500">Pending</span>
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
                    {SPACES.find(s => s.id === selectedSpace)?.name} - Final Design {currentImageIndex + 1}
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

                {/* Approval Badge */}
                {approvedImages.has(currentImage.id) && (
                  <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Approved for Final Design
                  </div>
                )}

                <img
                  src={currentImage.url}
                  alt={currentImage.alt}
                  className="w-full h-96 object-cover rounded-lg mb-6"
                />

                {/* Rating with Approval Option */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">How do you feel about this final design?</h4>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {(['love', 'like', 'not_a_fan'] as const).map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleRatingChange(currentImage.id, rating)}
                        className={`p-3 rounded-lg border-2 transition-colors ${
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

                  {/* Approve Button */}
                  <button
                    onClick={() => handleRatingChange(currentImage.id, 'approved')}
                    className={`w-full p-4 rounded-lg border-2 transition-colors ${
                      approvedImages.has(currentImage.id)
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : 'border-green-300 hover:border-green-400 hover:bg-green-50'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">✅</div>
                      <div className="font-semibold">
                        {approvedImages.has(currentImage.id) ? 'APPROVED' : 'APPROVE THIS DESIGN'}
                      </div>
                      <div className="text-sm opacity-75">
                        {approvedImages.has(currentImage.id) ? 'This design is approved' : 'Click to approve this design'}
                      </div>
                    </div>
                  </button>
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Design Elements</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium text-green-700 mb-2">What you love:</h5>
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
                      <h5 className="text-sm font-medium text-red-700 mb-2">What could be improved:</h5>
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
                No final designs available for this space
              </div>
            )}
          </div>

          {/* Feedback Panel */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Final Comments</h3>
            
            {currentImage && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comments for this design:
                  </label>
                  <textarea
                    value={currentFeedback?.comment || ''}
                    onChange={(e) => handleCommentChange(currentImage.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Any final thoughts or requested adjustments..."
                  />
                </div>

                {/* Approval Status */}
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2">
                    {approvedImages.has(currentImage.id) ? (
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    )}
                    <span className={`text-sm font-medium ${
                      approvedImages.has(currentImage.id) ? 'text-green-600' : 'text-amber-600'
                    }`}>
                      {approvedImages.has(currentImage.id) ? 'Design approved' : 'Approval pending'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Final Submit Button */}
        <div className="mt-8 text-center">
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Project Completion Requirements</h3>
            <p className="text-blue-800 mb-4">
              Please approve at least one design from each space to complete your project.
            </p>
            <div className="text-sm text-blue-700">
              {SPACES.filter(space => 
                MOCK_FINAL_IMAGES.some(img => img.spaceId === space.id)
              ).map((space) => (
                <div key={space.id} className="flex items-center justify-center gap-2 mb-1">
                  <span>{space.name}:</span>
                  {getSpaceApprovalStatus(space.id) ? (
                    <span className="text-green-600 font-medium">✓ Approved</span>
                  ) : (
                    <span className="text-amber-600">Pending approval</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleFinalSubmit}
            disabled={!allSpacesApproved}
            className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-semibold"
          >
            Complete Project & Receive Final Design Package
          </button>
          
          {!allSpacesApproved && (
            <p className="text-sm text-gray-600 mt-2">
              Please approve at least one design from each space to complete your project
            </p>
          )}
        </div>
      </div>
    </div>
  );
}