import React from 'react';
import { useQuery } from 'react-query';
import getUserPollData from '../services/getUserPollData';
import { FaChartLine, FaUsers, FaTrophy, FaClock } from 'react-icons/fa';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

function TeacherAnalytics() {
  const { data: polls, isLoading } = useQuery(['polls'], getUserPollData);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
        <div className="skeleton h-96 w-full"></div>
      </div>
    );
  }

  const totalVotes = polls?.reduce((sum, poll) => {
    return sum + poll.options.reduce((optSum, opt) => optSum + opt.voteCount, 0);
  }, 0) || 0;

  const avgVotesPerPoll = polls?.length > 0 ? Math.round(totalVotes / polls.length) : 0;
  
  const engagementData = {
    labels: polls?.slice(-7).map(poll => poll.title.substring(0, 20) + '...') || [],
    datasets: [{
      label: 'Votes per Poll',
      data: polls?.slice(-7).map(poll => 
        poll.options.reduce((sum, opt) => sum + opt.voteCount, 0)
      ) || [],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
    }]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <FaChartLine className="text-blue-400" />
            Teaching Analytics
          </h1>
          <p className="text-lg text-gray-300">
            Insights to improve your teaching effectiveness
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-3">
              <FaUsers className="text-2xl text-blue-400" />
              <span className="text-gray-300">Total Engagement</span>
            </div>
            <p className="text-3xl font-bold text-white">{totalVotes}</p>
            <p className="text-sm text-gray-400">student responses</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-3">
              <FaTrophy className="text-2xl text-yellow-400" />
              <span className="text-gray-300">Avg. Participation</span>
            </div>
            <p className="text-3xl font-bold text-white">{avgVotesPerPoll}</p>
            <p className="text-sm text-gray-400">votes per poll</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-3">
              <FaChartLine className="text-2xl text-green-400" />
              <span className="text-gray-300">Active Polls</span>
            </div>
            <p className="text-3xl font-bold text-white">{polls?.length || 0}</p>
            <p className="text-sm text-gray-400">polls created</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-3">
              <FaClock className="text-2xl text-purple-400" />
              <span className="text-gray-300">Time Saved</span>
            </div>
            <p className="text-3xl font-bold text-white">{Math.round((polls?.length || 0) * 0.5 * 10) / 10}h</p>
            <p className="text-sm text-gray-400">this week</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <h2 className="text-xl font-bold text-white mb-6">Engagement Trend</h2>
            <div className="h-64">
              <Line 
                data={engagementData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                      grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    },
                    x: {
                      ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                      grid: { display: false },
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <h2 className="text-xl font-bold text-white mb-6">Poll Performance</h2>
            <div className="space-y-4">
              {polls?.slice(0, 5).map((poll, index) => {
                const votes = poll.options.reduce((sum, opt) => sum + opt.voteCount, 0);
                return (
                  <div key={poll._id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">{poll.title}</p>
                      <p className="text-sm text-gray-400">{votes} responses</p>
                    </div>
                    <div className="text-right">
                      <div className="w-16 bg-slate-600 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${Math.min((votes / 50) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherAnalytics;