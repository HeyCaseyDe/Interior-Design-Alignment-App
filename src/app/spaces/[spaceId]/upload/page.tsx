'use client';

import { useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { SPACES } from '@/data/mockData';
import { UploadedImage } from '@/types';

export default function UploadPage() {
  const router = useRouter();
  const params = useParams();
  const { currentProject } = useAppContext();
  const spaceId = params.spaceId as string;
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [currentComment, setCurrentComment] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);

  const space = SPACES.find(s => s.id === spaceId);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !currentProject) return;

    Array.from(files).forEach((file, index) => {
      if (uploadedImages.length + index < 5) { // Max 5 images
        const reader = new FileReader();
        reader.onload = (event) => {
          const uploadedImage: UploadedImage = {
            id: `upload-${Date.now()}-${index}`,
            projectId: currentProject.id,
            spaceId: spaceId,
            url: event.target?.result as string,
            filename: file.name,
            tags: ['user-uploaded', 'inspiration', 'personal-style'], // Mock AI tags
            createdAt: new Date(),
          };
          
          setUploadedImages(prev => [...prev, uploadedImage]);
        };
        reader.readAsDataURL(file);
      }
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (imageId: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
    if (currentImageIndex !== null && uploadedImages[currentImageIndex]?.id === imageId) {
      setCurrentImageIndex(null);
      setCurrentComment('');
    }
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setCurrentComment(uploadedImages[index].comment || '');
  };

  const handleSaveComment = () => {
    if (currentImageIndex === null) return;

    setUploadedImages(prev => 
      prev.map((img, index) => 
        index === currentImageIndex 
          ? { ...img, comment: currentComment }
          : img
      )
    );
  };

  const handleFinishSpace = () => {
    // Save uploaded images to localStorage
    const existingUploads = JSON.parse(localStorage.getItem('uploadedImages') || '[]');
    const filteredUploads = existingUploads.filter((img: UploadedImage) => img.spaceId !== spaceId);
    const updatedUploads = [...filteredUploads, ...uploadedImages];
    localStorage.setItem('uploadedImages', JSON.stringify(updatedUploads));

    // Navigate back to spaces overview
    router.push('/spaces');
  };

  if (!space) {
    return <div>Space not found</div>;
  }

  const remainingUploads = 5 - uploadedImages.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">{space.name} - Inspiration Images</h1>
          <p className="text-gray-600 mt-2">
            Upload up to 5 images that inspire you for this space (optional).
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Inspiration Images</h2>
              
              {/* Upload Button */}
              {remainingUploads > 0 && (
                <div className="mb-6">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors group"
                  >
                    <div className="text-center">
                      <svg className="w-12 h-12 text-gray-400 group-hover:text-blue-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <p className="text-lg text-gray-600 group-hover:text-blue-600">
                        Click to upload images
                      </p>
                      <p className="text-sm text-gray-500">
                        {remainingUploads} {remainingUploads === 1 ? 'slot' : 'slots'} remaining • JPG, PNG up to 10MB each
                      </p>
                    </div>
                  </button>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              )}

              {/* Uploaded Images Grid */}
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div
                      key={image.id}
                      onClick={() => handleImageClick(index)}
                      className={`relative cursor-pointer rounded-lg overflow-hidden transition-all ${
                        currentImageIndex === index
                          ? 'ring-4 ring-blue-500 shadow-lg'
                          : 'hover:shadow-md'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.filename}
                        className="w-full h-32 object-cover"
                      />
                      
                      {/* Remove button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(image.id);
                        }}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      {/* Selected indicator */}
                      {currentImageIndex === index && (
                        <div className="absolute bottom-2 left-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {uploadedImages.length === 0 && remainingUploads === 5 && (
                <div className="text-center text-gray-500 py-8">
                  <p>No images uploaded yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Comment Sidebar */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {currentImageIndex !== null ? (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Image Details</h3>
                
                <div>
                  <img
                    src={uploadedImages[currentImageIndex].url}
                    alt={uploadedImages[currentImageIndex].filename}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    {uploadedImages[currentImageIndex].filename}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">AI-Generated Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {uploadedImages[currentImageIndex].tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What inspires you about this image?
                  </label>
                  <textarea
                    value={currentComment}
                    onChange={(e) => setCurrentComment(e.target.value)}
                    onBlur={handleSaveComment}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Describe what you love about this image..."
                  />
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>Select an image to add comments</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <button
            onClick={() => router.push(`/spaces/${spaceId}/ranking`)}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Ranking
          </button>

          <div className="text-sm text-gray-600">
            {uploadedImages.length} of 5 images uploaded
          </div>

          <button
            onClick={handleFinishSpace}
            className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Finish {space.name}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}