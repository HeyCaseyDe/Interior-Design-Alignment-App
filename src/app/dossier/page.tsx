'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { MOCK_DOSSIER_SECTIONS, SPACES, MOCK_BOARDS } from '@/data/mockData';
import { DesignDossier, DossierSection, UserSelection } from '@/types';

export default function DossierPage() {
  const router = useRouter();
  const { currentProject, setCurrentProject } = useAppContext();
  const [dossier, setDossier] = useState<DesignDossier | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['1']));
  const [feedback, setFeedback] = useState('');
  const [regenerationCount, setRegenerationCount] = useState(0);

  useEffect(() => {
    // Simulate AI dossier generation
    const generateDossier = async () => {
      setIsGenerating(true);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Load user data to customize dossier
      const selections = JSON.parse(localStorage.getItem('userSelections') || '[]');
      const uploadedImages = JSON.parse(localStorage.getItem('uploadedImages') || '[]');
      
      // Generate personalized sections based on selections
      const personalizedSections = generatePersonalizedSections(selections, uploadedImages);

      const newDossier: DesignDossier = {
        id: 'dossier-1',
        projectId: currentProject?.id || 'project-1',
        sections: personalizedSections,
        isSubmitted: false,
        regenerationCount: regenerationCount,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setDossier(newDossier);
      setIsGenerating(false);
    };

    generateDossier();
  }, [regenerationCount, currentProject]);

  const generatePersonalizedSections = (selections: UserSelection[], uploadedImages: any[]) => {
    // Extract most liked tags
    const allLikedTags = selections.flatMap(s => s.likedTags);
    const tagCounts = allLikedTags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topTags = Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8)
      .map(([tag]) => tag);

    // Create personalized content
    return [
      {
        id: '1',
        title: 'Project Overview',
        content: `Based on your selections across ${SPACES.filter(s => s.isActive).length} spaces, we see a clear vision emerging for your interior design preferences. Your choices demonstrate a sophisticated understanding of design elements and a consistent aesthetic vision that we're excited to bring to life.`,
        order: 1,
        type: 'summary' as const
      },
      {
        id: '2',
        title: 'Your Design DNA',
        content: `Your selections reveal a preference for ${topTags.slice(0, 3).join(', ')} elements. This suggests you appreciate ${topTags.includes('modern') ? 'contemporary sophistication' : 'timeless elegance'} with careful attention to ${topTags.includes('natural') || topTags.includes('wood') ? 'natural materials and organic textures' : 'refined finishes and quality craftsmanship'}.`,
        order: 2,
        type: 'style' as const
      },
      {
        id: '3',
        title: 'Most Selected Elements',
        content: topTags.join(' • '),
        order: 3,
        type: 'tags' as const
      },
      ...SPACES.filter(s => s.isActive).map((space, index) => {
        const spaceSelections = selections.filter(s => s.spaceId === space.id);
        const spaceTopTags = spaceSelections
          .flatMap(s => s.likedTags)
          .slice(0, 5)
          .join(', ');
        
        return {
          id: `space-${space.id}`,
          title: `${space.name} Preferences`,
          content: spaceSelections.length > 0 
            ? `Your ${space.name.toLowerCase()} selections emphasize ${spaceTopTags || 'clean, functional design'}. ${spaceSelections.some(s => s.comment) ? 'Your comments indicate a desire for both beauty and functionality in this space.' : 'You gravitate toward designs that balance aesthetic appeal with practical considerations.'}`
            : `We'll develop concepts for your ${space.name.toLowerCase()} based on your overall design preferences.`,
          order: 4 + index,
          type: 'space' as const
        };
      }),
      ...(uploadedImages.length > 0 ? [{
        id: 'inspiration',
        title: 'Your Personal Inspirations',
        content: `You've shared ${uploadedImages.length} personal inspiration images that provide valuable insight into your unique style preferences. These images will help us understand the specific elements and moods that resonate with you personally.`,
        order: 10,
        type: 'inspiration' as const
      }] : [])
    ];
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const handleRegenerateSection = (sectionId: string) => {
    if (!dossier) return;
    
    // Simulate section regeneration
    const updatedSections = dossier.sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          content: `[Regenerated] ${section.content} This version incorporates your latest feedback and preferences for a more personalized result.`
        };
      }
      return section;
    });

    setDossier({
      ...dossier,
      sections: updatedSections,
      updatedAt: new Date()
    });
  };

  const handleRegenerateAll = () => {
    if (regenerationCount >= 5) return;
    setRegenerationCount(prev => prev + 1);
  };

  const handleSubmit = () => {
    if (!dossier || !currentProject) return;

    // Update project status and save dossier
    const updatedProject = {
      ...currentProject,
      status: 'PENDING_ADMIN_REVIEW' as const,
    };

    const submittedDossier = {
      ...dossier,
      isSubmitted: true,
    };

    setCurrentProject(updatedProject);
    localStorage.setItem('currentProject', JSON.stringify(updatedProject));
    localStorage.setItem('designDossier', JSON.stringify(submittedDossier));

    // Simulate notification to admin
    alert('Design dossier submitted! Our design team has been notified and will begin working on your concepts.');
    
    // Navigate to a waiting/status page
    router.push('/status');
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Generating Your Design Dossier</h2>
            <p className="text-gray-600 mb-4">
              Our AI is analyzing your selections and preferences to create your personalized design brief...
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>✓ Processing your style selections</p>
              <p>✓ Analyzing preferred tags and elements</p>
              <p>✓ Incorporating your inspiration images</p>
              <p className="animate-pulse">● Creating personalized recommendations</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!dossier) {
    return <div>Error generating dossier</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Your Design Dossier</h1>
              <p className="text-gray-600 mt-2">
                A personalized design brief based on your style preferences
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Regenerations: {regenerationCount}/5
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Dossier Sections */}
        <div className="space-y-6">
          {dossier.sections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow-sm">
              <div 
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50"
              >
                <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRegenerateSection(section.id);
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 px-2 py-1 rounded"
                  >
                    Regenerate
                  </button>
                  <svg 
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedSections.has(section.id) ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {expandedSections.has(section.id) && (
                <div className="px-6 pb-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                  
                  {/* Inline feedback */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <textarea
                          placeholder="Add feedback for this section..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={2}
                        />
                      </div>
                      <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors">
                        Add Note
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Overall Feedback */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Feedback</h3>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Any additional comments or adjustments you'd like to make to your design brief?"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/spaces')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Back to Spaces
            </button>
            <button
              onClick={handleRegenerateAll}
              disabled={regenerationCount >= 5}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Regenerate Entire Dossier
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="px-8 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Submit Design Brief
          </button>
        </div>
      </div>
    </div>
  );
}