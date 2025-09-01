'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';

export default function StatusPage() {
  const router = useRouter();
  const { currentProject } = useAppContext();
  const [mockPhase, setMockPhase] = useState<'waiting' | 'phase2' | 'phase3'>('waiting');

  const handleMockProgression = () => {
    if (mockPhase === 'waiting') {
      setMockPhase('phase2');
      router.push('/concept-review');
    } else if (mockPhase === 'phase2') {
      setMockPhase('phase3');
      router.push('/final-review');
    }
  };

  const getStatusInfo = () => {
    switch (mockPhase) {
      case 'waiting':
        return {
          title: 'Design Dossier Submitted!',
          subtitle: 'Our design team is reviewing your preferences',
          status: 'Under Review',
          description: 'Your design brief has been received and our expert designers are analyzing your style preferences. We\'ll notify you via email and SMS when your concept images are ready for review.',
          estimatedTime: '2-3 business days',
          buttonText: 'Simulate Phase 2 Ready',
        };
      case 'phase2':
        return {
          title: 'Concept Images Ready!',
          subtitle: 'Review and provide feedback on your design concepts',
          status: 'Phase 2 - Concept Review',
          description: 'Your designer has created initial concept images based on your preferences. Please review each image and provide feedback to help refine the designs.',
          estimatedTime: 'Waiting for your feedback',
          buttonText: 'Review Concepts',
        };
      case 'phase3':
        return {
          title: 'Final Designs Ready!',
          subtitle: 'Review and approve your refined designs',
          status: 'Phase 3 - Final Review',
          description: 'Based on your feedback, we\'ve refined the designs. Please review the final images and approve the ones you love.',
          estimatedTime: 'Waiting for your approval',
          buttonText: 'Review Final Designs',
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Project Status</h1>
          <p className="text-gray-600 mt-2">
            {currentProject?.name || 'Your Interior Design Project'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Status Card */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {mockPhase === 'waiting' ? (
                <svg className="w-8 h-8 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{statusInfo.title}</h2>
            <p className="text-gray-600 mb-4">{statusInfo.subtitle}</p>
            
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {statusInfo.status}
            </div>
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Project Timeline</h3>
          
          <div className="space-y-6">
            {/* Phase 1 - Complete */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Phase 1: Style Discovery</h4>
                <p className="text-gray-600 text-sm">Completed your style preferences and submitted design dossier</p>
              </div>
              <span className="text-green-600 text-sm font-medium">Complete</span>
            </div>

            {/* Phase 2 */}
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                mockPhase === 'waiting' ? 'bg-yellow-100 border-2 border-yellow-500' : 'bg-green-500'
              }`}>
                {mockPhase === 'waiting' ? (
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                ) : (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Phase 2: Concept Review</h4>
                <p className="text-gray-600 text-sm">Designer creates initial concepts for your feedback</p>
              </div>
              <span className={`text-sm font-medium ${
                mockPhase === 'waiting' ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {mockPhase === 'waiting' ? 'In Progress' : 'Complete'}
              </span>
            </div>

            {/* Phase 3 */}
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                mockPhase === 'phase3' ? 'bg-green-500' : mockPhase === 'phase2' ? 'bg-yellow-100 border-2 border-yellow-500' : 'bg-gray-200'
              }`}>
                {mockPhase === 'phase3' ? (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : mockPhase === 'phase2' ? (
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                ) : (
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Phase 3: Final Design</h4>
                <p className="text-gray-600 text-sm">Refined designs based on your feedback for final approval</p>
              </div>
              <span className={`text-sm font-medium ${
                mockPhase === 'phase3' ? 'text-green-600' : mockPhase === 'phase2' ? 'text-yellow-600' : 'text-gray-500'
              }`}>
                {mockPhase === 'phase3' ? 'Complete' : mockPhase === 'phase2' ? 'In Progress' : 'Pending'}
              </span>
            </div>
          </div>
        </div>

        {/* Current Status Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Happening Now</h3>
          <p className="text-gray-700 mb-4">{statusInfo.description}</p>
          
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Estimated time: {statusInfo.estimatedTime}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Questions?</h3>
          <p className="text-blue-800 mb-4">
            Our design team is here to help. You'll receive email and SMS notifications at each step, 
            but feel free to reach out if you have any questions.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center text-blue-700">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              support@prouve.design
            </div>
            <div className="flex items-center text-blue-700">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (555) 123-4567
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={handleMockProgression}
            className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {statusInfo.buttonText}
          </button>
          
          {/* Demo Note */}
          <p className="text-sm text-gray-500 mt-4">
            This is a prototype - click the button to simulate project progression
          </p>
        </div>
      </div>
    </div>
  );
}