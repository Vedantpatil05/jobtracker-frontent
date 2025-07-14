import React, { useState } from 'react';
import { aiAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { DocumentTextIcon, SparklesIcon } from '@heroicons/react/24/outline';

const AIResume = () => {
  const [formData, setFormData] = useState({
    jobRole: '',
    experience: ''
  });
  const [bulletPoints, setBulletPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setBulletPoints([]);

    try {
      const response = await aiAPI.generateResume(formData.jobRole, formData.experience);
      setBulletPoints(response.data.bulletPoints);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate resume bullet points');
    }
    
    setLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <SparklesIcon className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">AI Resume Builder</h1>
          <p className="mt-2 text-gray-600">
            Generate compelling resume bullet points tailored to specific job roles
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
                Job Details
              </h3>
              
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="jobRole" className="block text-sm font-medium text-gray-700">
                    Job Role *
                  </label>
                  <input
                    type="text"
                    name="jobRole"
                    id="jobRole"
                    required
                    value={formData.jobRole}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g., Frontend Developer, Data Scientist"
                  />
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                    Your Experience *
                  </label>
                  <textarea
                    name="experience"
                    id="experience"
                    rows={4}
                    required
                    value={formData.experience}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Describe your relevant experience, skills, and achievements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <LoadingSpinner size="small" />
                  ) : (
                    <>
                      <SparklesIcon className="h-4 w-4 mr-2" />
                      Generate Resume Points
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
                Generated Resume Points
              </h3>
              
              {bulletPoints.length > 0 ? (
                <div className="space-y-4">
                  {bulletPoints.map((point, index) => (
                    <div key={index} className="relative">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          </div>
                          <p className="ml-3 text-sm text-gray-700 flex-1">{point}</p>
                          <button
                            onClick={() => copyToClipboard(point)}
                            className="ml-2 text-gray-400 hover:text-gray-600"
                            title="Copy to clipboard"
                          >
                            <DocumentTextIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">How to use:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Copy and paste these points into your resume</li>
                      <li>• Customize them to match your specific experience</li>
                      <li>• Use action verbs and quantifiable achievements</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No bullet points yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Fill out the form and generate AI-powered resume bullet points.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIResume;