import React, { createContext, useState, useContext, useCallback } from 'react';
import { jobAPI } from '../services/api';

const JobContext = createContext();

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await jobAPI.getAllJobs();
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addJob = async (jobData) => {
    try {
      const response = await jobAPI.createJob(jobData);
      setJobs(prev => [...prev, response.data]);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to add job' 
      };
    }
  };

  const updateJob = async (id, jobData) => {
    try {
      const response = await jobAPI.updateJob(id, jobData);
      setJobs(prev => prev.map(job => 
        job._id === id ? response.data : job
      ));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update job' 
      };
    }
  };

  const deleteJob = async (id) => {
    try {
      await jobAPI.deleteJob(id);
      setJobs(prev => prev.filter(job => job._id !== id));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to delete job' 
      };
    }
  };

  const getJobStats = () => {
    const stats = jobs.reduce((acc, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    }, {});

    return {
      total: jobs.length,
      applied: stats.Applied || 0,
      interviewing: stats.Interviewing || 0,
      offer: stats.Offer || 0,
      rejected: stats.Rejected || 0
    };
  };

  const value = {
    jobs,
    loading,
    fetchJobs,
    addJob,
    updateJob,
    deleteJob,
    getJobStats
  };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
};