import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BuildingOfficeIcon, 
  CalendarIcon, 
  PencilIcon, 
  TrashIcon,
  LinkIcon 
} from '@heroicons/react/24/outline';

const JobCard = ({ job, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-100 text-blue-800';
      case 'Interviewing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Offer':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">{job.company}</h3>
          </div>
          <h4 className="text-md font-medium text-gray-700 mb-2">{job.title}</h4>
          
          <div className="flex items-center mb-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
              {job.status}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-500 mb-3">
            <CalendarIcon className="h-4 w-4 mr-1" />
            Applied: {formatDate(job.appliedDate)}
          </div>

          {job.notes && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{job.notes}</p>
          )}

          {job.jobUrl && (
            <a
              href={job.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <LinkIcon className="h-4 w-4 mr-1" />
              View Job Posting
            </a>
          )}
        </div>
        
        <div className="flex space-x-2 ml-4">
          <Link
            to={`/edit-job/${job._id}`}
            className="p-2 text-gray-400 hover:text-blue-600 rounded-md hover:bg-blue-50"
          >
            <PencilIcon className="h-4 w-4" />
          </Link>
          <button
            onClick={() => onDelete(job._id)}
            className="p-2 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;