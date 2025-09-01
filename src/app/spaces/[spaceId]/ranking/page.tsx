'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { SPACES, MOCK_BOARDS } from '@/data/mockData';
import { UserSelection, SpaceRanking } from '@/types';

export default function RankingPage() {
  const router = useRouter();
  const params = useParams();
  const { currentProject } = useAppContext();
  const spaceId = params.spaceId as string;
  
  const [selections, setSelections] = useState<UserSelection[]>([]);
  const [rankedImages, setRankedImages] = useState<string[]>([]);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const space = SPACES.find(s => s.id === spaceId);
  const spaceBoards = MOCK_BOARDS.filter(b => b.spaceId === spaceId);

  useEffect(() => {
    // Load saved selections
    const saved = localStorage.getItem('userSelections');
    console.log('Loading saved selections for space:', spaceId);
    console.log('Raw localStorage data:', saved);
    
    if (saved) {
      const allSelections = JSON.parse(saved);
      console.log('All selections:', allSelections);
      
      const spaceSelections = allSelections.filter((s: UserSelection) => s.spaceId === spaceId);
      console.log('Space selections for', spaceId, ':', spaceSelections);
      
      setSelections(spaceSelections);
      
      // Initialize ranking order with RANDOMIZED image IDs to avoid bias
      const imageIds = spaceSelections.map((s: UserSelection) => s.imageId);
      const shuffledImageIds = [...imageIds].sort(() => Math.random() - 0.5);
      setRankedImages(shuffledImageIds);
    }
  }, [spaceId]);

  const getImageData = (imageId: string) => {
    for (const board of spaceBoards) {
      const image = board.images.find(img => img.id === imageId);
      if (image) return { image, board };
    }
    return null;
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedItem === null) return;
    
    const newRankedImages = [...rankedImages];
    const draggedImageId = newRankedImages[draggedItem];
    
    // Remove the dragged item
    newRankedImages.splice(draggedItem, 1);
    
    // Insert at the new position
    newRankedImages.splice(dropIndex, 0, draggedImageId);
    
    setRankedImages(newRankedImages);
    setDraggedItem(null);
  };

  const handleSaveRanking = () => {
    if (!currentProject) return;

    // Save ranking
    const ranking: SpaceRanking = {
      id: `ranking-${spaceId}`,
      projectId: currentProject.id,
      spaceId: spaceId,
      rankedImageIds: rankedImages,
      createdAt: new Date(),
    };

    // Save to localStorage
    const existingRankings = JSON.parse(localStorage.getItem('spaceRankings') || '[]');
    const filteredRankings = existingRankings.filter((r: SpaceRanking) => r.spaceId !== spaceId);
    filteredRankings.push(ranking);
    localStorage.setItem('spaceRankings', JSON.stringify(filteredRankings));

    // Navigate to upload page
    router.push(`/spaces/${spaceId}/upload`);
  };

  if (!space) {
    return <div>Space not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">{space.name} - Ranking</h1>
          <p className="text-gray-600 mt-2">
            Reorder these images so that your favorite is on the top. Drag and drop to arrange from most preferred (top) to least preferred (bottom).
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Rank Your Selected Images</h2>
          
          {rankedImages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>No selections found. Please complete all boards first.</p>
              <button
                onClick={() => router.push(`/spaces/${spaceId}`)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Back to Selection
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Ranking indicators */}
              <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Most Preferred
                </span>
                <span className="flex items-center gap-1">
                  Least Preferred
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                </span>
              </div>
              
              {rankedImages.map((imageId, index) => {
                const imageData = getImageData(imageId);
                if (!imageData) return null;

                const { image, board } = imageData;
                const selection = selections.find(s => s.imageId === imageId);

                return (
                  <div
                    key={imageId}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`flex items-center p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 cursor-move hover:border-blue-300 transition-colors ${
                      draggedItem === index ? 'opacity-50' : ''
                    }`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-4 font-semibold ${
                      index === 0 
                        ? 'bg-green-100 text-green-700' // Most preferred - green
                        : index === 1 
                        ? 'bg-blue-100 text-blue-700'  // Second - blue  
                        : index === rankedImages.length - 1
                        ? 'bg-gray-100 text-gray-600'  // Least preferred - gray
                        : 'bg-blue-100 text-blue-600'  // Middle ranks - light blue
                    }`}>
                      {index + 1}
                    </div>
                    
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{board.name}</h3>
                      <p className="text-gray-600 text-sm">{image.alt}</p>
                      
                      {selection && (
                        <div className="mt-2 space-y-1">
                          {selection.likedTags.length > 0 && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-green-600 font-medium">Liked:</span>
                              <div className="flex flex-wrap gap-1">
                                {selection.likedTags.slice(0, 3).map(tag => (
                                  <span key={tag} className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                                    {tag}
                                  </span>
                                ))}
                                {selection.likedTags.length > 3 && (
                                  <span className="text-xs text-green-600">+{selection.likedTags.length - 3} more</span>
                                )}
                              </div>
                            </div>
                          )}
                          
                          {selection.dislikedTags.length > 0 && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-red-600 font-medium">Disliked:</span>
                              <div className="flex flex-wrap gap-1">
                                {selection.dislikedTags.slice(0, 3).map(tag => (
                                  <span key={tag} className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
                                    {tag}
                                  </span>
                                ))}
                                {selection.dislikedTags.length > 3 && (
                                  <span className="text-xs text-red-600">+{selection.dislikedTags.length - 3} more</span>
                                )}
                              </div>
                            </div>
                          )}

                          {selection.comment && (
                            <div className="flex items-start gap-2">
                              <span className="text-xs text-blue-600 font-medium">Comment:</span>
                              <p className="text-xs text-gray-700 italic">{selection.comment}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-center text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      <span className="text-xs mt-1">Drag</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <button
              onClick={() => router.push(`/spaces/${spaceId}`)}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Selection
            </button>

            <button
              onClick={handleSaveRanking}
              disabled={rankedImages.length === 0}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Continue to Inspiration Upload
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}