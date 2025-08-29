import React from 'react';
import { FaQrcode, FaShare, FaChartLine, FaUsers, FaClock, FaDownload } from 'react-icons/fa';

function TeacherPollControls({ poll, studentUrl, onShare }) {
  const totalVotes = poll?.data?.pollData?.options.reduce((sum, opt) => sum + opt.voteCount, 0) || 0;
  const createdAt = new Date(poll?.data?.pollData?.createdAt);
  const timeAgo = Math.floor((Date.now() - createdAt) / (1000 * 60));

  const exportResults = () => {
    const results = poll?.data?.pollData?.options.map((option, index) => ({
      option: `${String.fromCharCode(65 + index)}: ${option.name}`,
      votes: option.voteCount,
      percentage: totalVotes > 0 ? Math.round((option.voteCount / totalVotes) * 100) : 0
    }));

    const csvContent = [
      ['Option', 'Votes', 'Percentage'],
      ...results.map(r => [r.option, r.votes, `${r.percentage}%`])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `poll-results-${poll?.data?.pollData?.title?.replace(/\s+/g, '-')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Poll Stats */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <FaChartLine className="text-blue-400" />
          Poll Statistics
        </h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Total Responses</span>
            <span className="text-2xl font-bold text-blue-400">{totalVotes}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Options</span>
            <span className="text-white font-medium">{poll?.data?.pollData?.options.length}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Created</span>
            <span className="text-white font-medium">
              {timeAgo < 60 ? `${timeAgo}m ago` : `${Math.floor(timeAgo / 60)}h ago`}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Status</span>
            <span className="badge badge-success">Active</span>
          </div>
        </div>
      </div>

      {/* Sharing Tools */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <FaShare className="text-green-400" />
          Share with Students
        </h3>
        
        <div className="space-y-3">
          <button
            className="btn btn-primary w-full gap-2"
            onClick={onShare}
          >
            <FaQrcode /> Generate QR Code
          </button>
          
          <button
            className="btn btn-outline w-full gap-2"
            onClick={() => {
              navigator.clipboard.writeText(studentUrl);
              toast.success("Student link copied!");
            }}
          >
            <FaShare /> Copy Student Link
          </button>
          
          <div className="bg-slate-700/50 p-3 rounded-lg">
            <p className="text-xs text-gray-400 mb-1">Student URL:</p>
            <p className="text-sm text-blue-400 break-all">{studentUrl}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <FaUsers className="text-purple-400" />
          Quick Actions
        </h3>
        
        <div className="space-y-3">
          <button
            className="btn btn-secondary w-full gap-2"
            onClick={exportResults}
            disabled={totalVotes === 0}
          >
            <FaDownload /> Export Results
          </button>
          
          <button
            className="btn btn-info w-full gap-2"
            onClick={() => window.open(studentUrl, '_blank')}
          >
            <FaUsers /> View as Student
          </button>
          
          <button
            className="btn btn-accent w-full gap-2"
            onClick={() => navigate('/create')}
          >
            <FaPlus /> Create Similar Poll
          </button>
        </div>
      </div>

      {/* Engagement Tips */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 border border-blue-500/30">
        <h3 className="text-lg font-bold text-white mb-3">💡 Engagement Tips</h3>
        <ul className="text-sm text-gray-300 space-y-2">
          <li>• Display QR code on your screen</li>
          <li>• Give students 2-3 minutes to vote</li>
          <li>• Discuss results as a class</li>
          <li>• Use results to guide next lesson</li>
        </ul>
      </div>
    </div>
  );
}

export default TeacherPollControls;