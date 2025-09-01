'use client';

import { useAppContext } from '@/context/AppContext';

export default function CompletePage() {
  const { currentProject, currentUser } = useAppContext();

  const handleDownloadPackage = () => {
    // In a real app, this would trigger a download
    alert('Final design package download initiated! Check your email for the complete package.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Congratulations!</h1>
          <p className="text-green-100">Your interior design project is complete</p>
        </div>

        {/* Project Details */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {currentProject?.name || 'Your Interior Design Project'}
            </h2>
            <p className="text-gray-600">
              Thank you, {currentUser?.name || 'valued client'}! Your final design package is ready.
            </p>
          </div>

          {/* What's Included */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Final Design Package Includes:</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Personalized Design Dossier</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>High-resolution images of approved designs</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Detailed specifications and color palettes</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Product recommendations and sourcing guide</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Implementation timeline and tips</span>
              </div>
            </div>
          </div>

          {/* Project Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">7</div>
              <div className="text-sm text-blue-800">Spaces Designed</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">15</div>
              <div className="text-sm text-green-800">Concepts Reviewed</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-purple-800">Satisfaction Goal</div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <button
              onClick={handleDownloadPackage}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Download Complete Design Package
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Schedule Implementation Call
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                Share Feedback
              </button>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">What's Next?</h3>
            <div className="space-y-2 text-blue-800 text-sm">
              <p>• Your design package will be emailed within the next hour</p>
              <p>• Our team will reach out to schedule an optional implementation consultation</p>
              <p>• You'll receive a follow-up survey to share your experience</p>
              <p>• We're here to support you throughout your design implementation journey</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Questions? Contact us at <strong>support@prouve.design</strong> or <strong>(555) 123-4567</strong></p>
            <p className="mt-2">Thank you for choosing Prouvé for your interior design needs!</p>
          </div>
        </div>
      </div>
    </div>
  );
}