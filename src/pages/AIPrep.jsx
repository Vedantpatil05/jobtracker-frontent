import React, { useState } from 'react';
import { aiAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { AcademicCapIcon, SparklesIcon } from '@heroicons/react/24/outline';

const AIPrep = () => {
  const [formData, setFormData] = useState({
    jobRole: '',
    company: ''
  });
  const [prepPlan, setPrepPlan] = useState('');
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
    setPrepPlan('');

    try {
      const response = await aiAPI.generatePrepPlan(formData.jobRole, formData.company);
      setPrepPlan(response.data.prepPlan);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate preparation plan');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <AcademicCapIcon className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">AI Interview Prep</h1>
          <p className="mt-2 text-gray-600">
            Get personalized interview preparation plans for specific companies and roles
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
                Interview Details
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
                    placeholder="e.g., Frontend Developer, Product Manager"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g., Google, Apple, Netflix"
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
                      Generate Prep Plan
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
                Preparation Plan
              </h3>
              
              {prepPlan ? (
                <div className="prose max-w-none">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-normal">
                      {prepPlan}
                    </pre>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">Preparation Tips:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Practice your answers out loud</li>
                      <li>• Research the company culture and values</li>
                      <li>• Prepare thoughtful questions to ask the interviewer</li>
                      <li>• Review your resume and be ready to discuss your experiences</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <AcademicCapIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No preparation plan yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Enter the job role and company to generate a personalized prep plan.
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

export default AIPrep;