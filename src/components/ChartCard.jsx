import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartCard = ({ stats }) => {
  const data = {
    labels: ['Applied', 'Interviewing', 'Offer', 'Rejected'],
    datasets: [
      {
        data: [stats.applied, stats.interviewing, stats.offer, stats.rejected],
        backgroundColor: [
          '#3B82F6', // Blue
          '#F59E0B', // Yellow
          '#10B981', // Green
          '#EF4444', // Red
        ],
        borderColor: [
          '#2563EB',
          '#D97706',
          '#059669',
          '#DC2626',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const percentage = ((value / stats.total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h3>
      <div className="h-64">
        {stats.total > 0 ? (
          <Doughnut data={data} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No applications yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartCard;