'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { SPACES } from '@/data/mockData';
import { Space, UserSelection } from '@/types';

export default function SpacesPage() {
  const router = useRouter();
  const { currentProject } = useAppContext();
  const [selections, setSelections] = useState<UserSelection[]>([]);

  useEffect(() => {
    // Load saved selections from localStorage
    const saved = localStorage.getItem('userSelections');
    if (saved) {
      setSelections(JSON.parse(saved));
    }
  }, []);

  const getSpaceProgress = (spaceId: string) => {
    const spaceSelections = selections.filter(s => s.spaceId === spaceId);
    const totalBoards = 5; // Each space has 5 boards
    return Math.round((spaceSelections.length / totalBoards) * 100);
  };

  const handleSpaceClick = (space: Space) => {
    router.push(`/spaces/${space.id}`);
  };

  const allSpacesComplete = SPACES.every(space => getSpaceProgress(space.id) === 100);

  const handleViewDossier = () => {
    router.push('/dossier');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Style Discovery</h1>
          <p className="text-gray-600 mt-2">
            Select your preferred images for each space. Complete all spaces to generate your design dossier.
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Overall Progress</h2>
              <p className="text-gray-600">
                {SPACES.filter(space => getSpaceProgress(space.id) === 100).length} of {SPACES.length} spaces complete
              </p>
            </div>
            {allSpacesComplete && (
              <button
                onClick={handleViewDossier}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                View Design Dossier
              </button>
            )}
          </div>
        </div>

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SPACES.filter(space => space.isActive).map((space) => {
            const progress = getSpaceProgress(space.id);
            const isComplete = progress === 100;

            return (
              <div
                key={space.id}
                onClick={() => handleSpaceClick(space)}
                className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{space.name}</h3>
                  {isComplete && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isComplete ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <p className="text-gray-600 text-sm">
                  {isComplete 
                    ? 'All boards completed' 
                    : `${5 - Math.floor(progress / 20)} boards remaining`
                  }
                </p>

                <div className="mt-4 flex items-center text-blue-600 text-sm">
                  <span>{isComplete ? 'Review selections' : 'Continue selection'}</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Message */}
        {!allSpacesComplete && (
          <div className="mt-8 text-center text-gray-600">
            <p>Complete all spaces to generate your personalized design dossier</p>
          </div>
        )}
      </div>
    </div>
  );
}