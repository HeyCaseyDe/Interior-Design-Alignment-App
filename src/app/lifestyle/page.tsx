'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { LIFESTYLE_OPTIONS } from '@/data/mockData';
import { LifestyleData } from '@/types';

export default function LifestylePage() {
  const router = useRouter();
  const { currentProject, setCurrentProject } = useAppContext();
  const [lifestyleData, setLifestyleData] = useState<LifestyleData>({
    budgetRange: '',
    appliancePreferences: [],
    familyLifestyle: [],
    styleIndicators: [],
  });

  const handleMultiSelect = (category: keyof LifestyleData, value: string) => {
    if (category === 'budgetRange') {
      setLifestyleData(prev => ({ ...prev, budgetRange: value }));
    } else {
      setLifestyleData(prev => {
        const currentArray = prev[category] as string[] || [];
        const isSelected = currentArray.includes(value);
        
        return {
          ...prev,
          [category]: isSelected 
            ? currentArray.filter(item => item !== value)
            : [...currentArray, value]
        };
      });
    }
  };

  const handleSubmit = () => {
    // Update project with lifestyle data
    if (currentProject) {
      const updatedProject = {
        ...currentProject,
        lifestyle: lifestyleData,
        status: 'PHASE1_IN_PROGRESS' as const,
      };
      setCurrentProject(updatedProject);
      localStorage.setItem('currentProject', JSON.stringify(updatedProject));
    }

    router.push('/spaces');
  };

  const handleSkip = () => {
    if (currentProject) {
      const updatedProject = {
        ...currentProject,
        status: 'PHASE1_IN_PROGRESS' as const,
      };
      setCurrentProject(updatedProject);
      localStorage.setItem('currentProject', JSON.stringify(updatedProject));
    }
    
    router.push('/spaces');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Tell us about your lifestyle
            </h1>
            <p className="text-gray-600">
              This optional questionnaire helps us understand your preferences better.
            </p>
          </div>

          <div className="space-y-8">
            {/* Budget Range */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget Range</h3>
              <div className="grid grid-cols-1 gap-3">
                {LIFESTYLE_OPTIONS.budgetRange.map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      name="budget"
                      value={option}
                      checked={lifestyleData.budgetRange === option}
                      onChange={(e) => handleMultiSelect('budgetRange', e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-3 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Appliance Preferences */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Appliance Preferences</h3>
              <div className="grid grid-cols-1 gap-3">
                {LIFESTYLE_OPTIONS.appliancePreferences.map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={lifestyleData.appliancePreferences?.includes(option)}
                      onChange={() => handleMultiSelect('appliancePreferences', option)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-3 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Family Lifestyle */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Family Lifestyle</h3>
              <div className="grid grid-cols-1 gap-3">
                {LIFESTYLE_OPTIONS.familyLifestyle.map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={lifestyleData.familyLifestyle?.includes(option)}
                      onChange={() => handleMultiSelect('familyLifestyle', option)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-3 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Style Indicators */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Style & Interests</h3>
              <div className="grid grid-cols-1 gap-3">
                {LIFESTYLE_OPTIONS.styleIndicators.map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={lifestyleData.styleIndicators?.includes(option)}
                      onChange={() => handleMultiSelect('styleIndicators', option)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-3 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleSkip}
              className="flex-1 px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Skip for Now
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Continue to Style Discovery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}