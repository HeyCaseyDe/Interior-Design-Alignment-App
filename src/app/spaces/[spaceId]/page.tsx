'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { SPACES, MOCK_BOARDS } from '@/data/mockData';
import { Board, BoardImage, UserSelection } from '@/types';

export default function SpacePage() {
  const router = useRouter();
  const params = useParams();
  const { currentProject } = useAppContext();
  const spaceId = params.spaceId as string;
  
  const [currentBoardIndex, setCurrentBoardIndex] = useState(0);
  const [selections, setSelections] = useState<UserSelection[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [likedTags, setLikedTags] = useState<string[]>([]);
  const [dislikedTags, setDislikedTags] = useState<string[]>([]);
  const [comment, setComment] = useState('');

  const space = SPACES.find(s => s.id === spaceId);
  const spaceBoards = MOCK_BOARDS.filter(b => b.spaceId === spaceId);
  const currentBoard = spaceBoards[currentBoardIndex];

  useEffect(() => {
    // Load saved selections
    const saved = localStorage.getItem('userSelections');
    console.log('Loading all selections on mount:', saved);
    if (saved) {
      const allSelections = JSON.parse(saved);
      console.log('Parsed selections:', allSelections);
      setSelections(allSelections);
    }
  }, []);

  useEffect(() => {
    // Load current board selection if exists
    if (currentBoard) {
      const existingSelection = selections.find(s => s.boardId === currentBoard.id);
      if (existingSelection) {
        setSelectedImage(existingSelection.imageId);
        setLikedTags(existingSelection.likedTags);
        setDislikedTags(existingSelection.dislikedTags);
        setComment(existingSelection.comment || '');
      } else {
        // Reset state for new board
        setSelectedImage(null);
        setLikedTags([]);
        setDislikedTags([]);
        setComment('');
      }
    }
  }, [currentBoard, selections]);

  const handleImageSelect = (image: BoardImage) => {
    setSelectedImage(image.id);
  };

  const handleTagToggle = (tag: string, type: 'liked' | 'disliked') => {
    if (type === 'liked') {
      setLikedTags(prev => 
        prev.includes(tag) 
          ? prev.filter(t => t !== tag)
          : [...prev.filter(t => t !== tag), tag] // Remove from disliked if moving to liked
      );
      setDislikedTags(prev => prev.filter(t => t !== tag));
    } else {
      setDislikedTags(prev => 
        prev.includes(tag) 
          ? prev.filter(t => t !== tag)
          : [...prev.filter(t => t !== tag), tag]
      );
      setLikedTags(prev => prev.filter(t => t !== tag));
    }
  };

  const saveCurrentSelection = () => {
    if (!selectedImage || !currentProject || !currentBoard) return;

    console.log('Saving selection for space:', spaceId);
    console.log('Board:', currentBoard);

    const selection: UserSelection = {
      id: `selection-${currentBoard.id}`,
      projectId: currentProject.id,
      spaceId: spaceId,
      boardId: currentBoard.id,
      imageId: selectedImage,
      likedTags,
      dislikedTags,
      comment: comment || undefined,
      createdAt: new Date(),
    };

    console.log('Created selection:', selection);

    // Get ALL selections from localStorage, not just component state
    const existingSelections = JSON.parse(localStorage.getItem('userSelections') || '[]');
    console.log('Existing selections from localStorage:', existingSelections);
    
    // Remove any existing selection for this board
    const filteredSelections = existingSelections.filter((s: UserSelection) => s.boardId !== currentBoard.id);
    
    // Add the new selection
    filteredSelections.push(selection);
    
    console.log('All selections after save:', filteredSelections);
    
    // Update component state with all selections
    setSelections(filteredSelections);
    
    // Save all selections back to localStorage
    localStorage.setItem('userSelections', JSON.stringify(filteredSelections));
  };

  const handleNext = () => {
    if (!selectedImage) return;
    
    saveCurrentSelection();
    
    if (currentBoardIndex < spaceBoards.length - 1) {
      setCurrentBoardIndex(currentBoardIndex + 1);
    } else {
      // All boards in this space are complete, go to ranking
      router.push(`/spaces/${spaceId}/ranking`);
    }
  };

  const handlePrevious = () => {
    if (currentBoardIndex > 0) {
      saveCurrentSelection();
      setCurrentBoardIndex(currentBoardIndex - 1);
    }
  };

  const selectedImageData = currentBoard?.images.find(img => img.id === selectedImage);
  const canProceed = selectedImage !== null;

  if (!space || !currentBoard) {
    return <div>Space not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{space.name}</h1>
              <p className="text-gray-600">{currentBoard.name}</p>
            </div>
            <div className="text-sm text-gray-600">
              Board {currentBoardIndex + 1} of {spaceBoards.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentBoardIndex + (canProceed ? 1 : 0)) / spaceBoards.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Images Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Select the image that best represents your style preference:
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {currentBoard.images.map((image) => (
                <div
                  key={image.id}
                  onClick={() => handleImageSelect(image)}
                  className={`relative cursor-pointer rounded-lg overflow-hidden transition-all ${
                    selectedImage === image.id
                      ? 'ring-4 ring-blue-500 shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-48 object-cover"
                  />
                  {selectedImage === image.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tags and Comments Sidebar */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {selectedImageData ? (
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900">What do you like about this image?</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Elements you like:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedImageData.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleTagToggle(tag, 'liked')}
                          className={`px-3 py-1 text-xs rounded-full transition-colors ${
                            likedTags.includes(tag)
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
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Elements you don't like:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedImageData.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleTagToggle(tag, 'disliked')}
                          className={`px-3 py-1 text-xs rounded-full transition-colors ${
                            dislikedTags.includes(tag)
                              ? 'bg-red-100 text-red-800 border border-red-300'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional comments (optional):
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Tell us more about your preferences..."
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>Select an image to see tagging options</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <button
            onClick={handlePrevious}
            disabled={currentBoardIndex === 0}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <div className="text-sm text-gray-600">
            {canProceed ? (
              currentBoardIndex === spaceBoards.length - 1 ? 'Ready to rank your selections' : 'Selection saved'
            ) : 'Select an image to continue'}
          </div>

          <button
            onClick={handleNext}
            disabled={!canProceed}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {currentBoardIndex === spaceBoards.length - 1 ? 'Rank Selections' : 'Next'}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}