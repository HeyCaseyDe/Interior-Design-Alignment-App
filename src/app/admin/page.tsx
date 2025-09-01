'use client';

import { useState } from 'react';
import { SPACES, MOCK_BOARDS } from '@/data/mockData';

// Mock admin data
const MOCK_PROJECTS = [
  {
    id: 'project-1',
    clientName: 'Sarah Johnson',
    projectName: 'Sarah Johnson - 12/1/2024',
    status: 'PHASE2_FEEDBACK_COMPLETE',
    createdAt: '2024-12-01',
    completedSpaces: 7,
    totalSpaces: 7,
  },
  {
    id: 'project-2',
    clientName: 'Michael Chen',
    projectName: 'Modern Downtown Loft',
    status: 'PENDING_ADMIN_REVIEW',
    createdAt: '2024-12-02',
    completedSpaces: 5,
    totalSpaces: 6,
  },
  {
    id: 'project-3',
    clientName: 'Emma Davis',
    projectName: 'Suburban Family Home',
    status: 'PHASE3_PUBLISHED',
    createdAt: '2024-11-28',
    completedSpaces: 7,
    totalSpaces: 7,
  },
];

type ProjectStatus = 'PENDING_ADMIN_REVIEW' | 'PHASE2_PUBLISHED' | 'PHASE2_FEEDBACK_COMPLETE' | 'PHASE3_PUBLISHED' | 'PROJECT_COMPLETE';

export default function AdminDashboard() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedPanel, setSelectedPanel] = useState<'overview' | 'boards' | 'generation'>('overview');

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'PENDING_ADMIN_REVIEW': return 'bg-yellow-100 text-yellow-800';
      case 'PHASE2_PUBLISHED': return 'bg-blue-100 text-blue-800';
      case 'PHASE2_FEEDBACK_COMPLETE': return 'bg-purple-100 text-purple-800';
      case 'PHASE3_PUBLISHED': return 'bg-indigo-100 text-indigo-800';
      case 'PROJECT_COMPLETE': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: ProjectStatus) => {
    switch (status) {
      case 'PENDING_ADMIN_REVIEW': return 'Pending Admin Review';
      case 'PHASE2_PUBLISHED': return 'Phase 2 Published';
      case 'PHASE2_FEEDBACK_COMPLETE': return 'Phase 2 Feedback Complete';
      case 'PHASE3_PUBLISHED': return 'Phase 3 Published';
      case 'PROJECT_COMPLETE': return 'Project Complete';
      default: return status;
    }
  };

  const selectedProjectData = MOCK_PROJECTS.find(p => p.id === selectedProject);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Prouvé Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
          {/* Projects & Spaces Nav - Left Panel */}
          <div className="bg-white rounded-lg shadow-sm p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Client Projects</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm">+ New Project</button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-4">
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                All ({MOCK_PROJECTS.length})
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-full">
                Pending (2)
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-full">
                Active (1)
              </button>
            </div>

            {/* Projects List */}
            <div className="space-y-3">
              {MOCK_PROJECTS.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedProject === project.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 text-sm">{project.clientName}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status as ProjectStatus)}`}>
                      {getStatusText(project.status as ProjectStatus)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{project.projectName}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{project.createdAt}</span>
                    <span>{project.completedSpaces}/{project.totalSpaces} spaces</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Context Panel - Center */}
          <div className="bg-white rounded-lg shadow-sm p-6 overflow-y-auto">
            {selectedProjectData ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{selectedProjectData.clientName}</h2>
                    <p className="text-gray-600">{selectedProjectData.projectName}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(selectedProjectData.status as ProjectStatus)}`}>
                    {getStatusText(selectedProjectData.status as ProjectStatus)}
                  </span>
                </div>

                {/* Navigation Tabs */}
                <div className="flex gap-4 mb-6 border-b">
                  <button
                    onClick={() => setSelectedPanel('overview')}
                    className={`pb-2 px-1 text-sm font-medium ${
                      selectedPanel === 'overview'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Client Input
                  </button>
                  <button
                    onClick={() => setSelectedPanel('boards')}
                    className={`pb-2 px-1 text-sm font-medium ${
                      selectedPanel === 'boards'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Boards
                  </button>
                  <button
                    onClick={() => setSelectedPanel('generation')}
                    className={`pb-2 px-1 text-sm font-medium ${
                      selectedPanel === 'generation'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Working Images
                  </button>
                </div>

                {/* Panel Content */}
                {selectedPanel === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Design Dossier Summary</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>Style Preference:</strong> Modern contemporary with warm, natural elements
                        </p>
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>Top Tags:</strong> Modern, Clean Lines, Natural Materials, Neutral Colors
                        </p>
                        <p className="text-sm text-gray-700">
                          <strong>Budget:</strong> $100,000 - $150,000
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Space Preferences</h3>
                      <div className="space-y-3">
                        {SPACES.slice(0, 3).map((space) => (
                          <div key={space.id} className="border rounded-lg p-3">
                            <h4 className="font-medium text-gray-800 text-sm mb-1">{space.name}</h4>
                            <p className="text-xs text-gray-600">
                              Preferences captured • 5 boards completed • Ranking submitted
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Client Uploads</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedPanel === 'boards' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">Manage Boards</h3>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">+ Create Board</button>
                    </div>
                    
                    {MOCK_BOARDS.slice(0, 3).map((board) => (
                      <div key={board.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-800">{board.name}</h4>
                          <button className="text-gray-500 hover:text-gray-700">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{board.images.length} images • Kitchen</p>
                        <div className="grid grid-cols-6 gap-1">
                          {board.images.map((image) => (
                            <div key={image.id} className="aspect-square bg-gray-200 rounded"></div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedPanel === 'generation' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">Generated Images</h3>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
                          Upload
                        </button>
                        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                          Generate
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="border rounded-lg p-3">
                          <div className="aspect-video bg-gray-200 rounded mb-3"></div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Kitchen Concept {i}</span>
                            <div className="flex gap-1">
                              <button className="w-6 h-6 text-gray-400 hover:text-blue-600">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </button>
                              <button className="w-6 h-6 text-gray-400 hover:text-green-600">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 text-xs rounded ${
                              i <= 2 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {i <= 2 ? 'Client-Visible' : 'Draft'}
                            </span>
                            <button className="text-blue-600 hover:text-blue-800 text-xs">
                              Publish
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <p>Select a project to view details</p>
                </div>
              </div>
            )}
          </div>

          {/* AI Assistant Panel - Right */}
          <div className="bg-white rounded-lg shadow-sm p-6 overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">AI Assistant</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="text-sm font-medium text-gray-900">Generate Concept Prompts</div>
                    <div className="text-xs text-gray-600">Create AI prompts based on client preferences</div>
                  </button>
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="text-sm font-medium text-gray-900">Refine Dossier</div>
                    <div className="text-xs text-gray-600">Enhance client design brief</div>
                  </button>
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="text-sm font-medium text-gray-900">Tag Images</div>
                    <div className="text-xs text-gray-600">Auto-tag uploaded images</div>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">Generation Settings</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Style Emphasis</label>
                    <select className="w-full p-2 border border-gray-300 rounded text-sm">
                      <option>Modern Contemporary</option>
                      <option>Traditional</option>
                      <option>Transitional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Color Palette</label>
                    <select className="w-full p-2 border border-gray-300 rounded text-sm">
                      <option>Neutral Warm</option>
                      <option>Neutral Cool</option>
                      <option>Bold Accent</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">Chat with AI</h3>
                <div className="border border-gray-200 rounded-lg p-3 h-32 overflow-y-auto mb-3 bg-gray-50">
                  <div className="text-sm text-gray-600">
                    💡 Based on the client's selections, I recommend emphasizing natural materials and warm neutrals for their kitchen concepts.
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask the AI assistant..."
                    className="flex-1 p-2 border border-gray-300 rounded text-sm"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}