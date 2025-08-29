import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function StudentPollResults({ poll }) {
  const options = poll?.data?.pollData?.options || [];
  const totalVotes = options.reduce((sum, opt) => sum + opt.voteCount, 0);

  const chartData = {
    labels: options.map((option, index) => `${String.fromCharCode(65 + index)}: ${option.name}`),
    datasets: [
      {
        label: "Votes",
        data: options.map(option => option.voteCount),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
          'rgb(139, 92, 246)',
          'rgb(236, 72, 153)'
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          stepSize: 1,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          maxRotation: 0,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <h3 className="text-xl font-bold text-white mb-6 text-center">Live Results</h3>
      
      {/* Results Bars */}
      <div className="space-y-4 mb-6">
        {options.map((option, index) => {
          const percentage = totalVotes > 0 ? (option.voteCount / totalVotes) * 100 : 0;
          return (
            <div key={option._id} className="bg-slate-700/50 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-white flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option.name}
                </span>
                <span className="text-blue-400 font-bold">
                  {option.voteCount} ({Math.round(percentage)}%)
                </span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="h-64 mb-4">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div className="text-center text-gray-400">
        <p className="text-sm">Results update in real-time as more students vote</p>
      </div>
    </div>
  );
}

export default StudentPollResults;