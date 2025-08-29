import React from 'react';
import { FaMobile, FaDesktop, FaQrcode } from 'react-icons/fa';

function PollPreview({ title, description, options, category }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-slate-700/50">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <FaMobile className="text-blue-400" />
        Student View Preview
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mobile Preview */}
        <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl border-4 border-slate-700">
          <div className="bg-slate-800 rounded-2xl p-6 h-96 overflow-y-auto">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold text-lg">📊</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {title || "Your Poll Title"}
              </h3>
              <p className="text-sm text-gray-300">
                {description || "Poll description will appear here"}
              </p>
            </div>
            
            <div className="space-y-3">
              {(options.length > 0 ? options : ["Option A", "Option B"]).map((option, index) => (
                <button
                  key={index}
                  className="w-full p-4 bg-slate-700 hover:bg-blue-600 rounded-xl text-white font-medium transition-all duration-200 transform hover:scale-105"
                >
                  <span className="mr-3 text-blue-400 font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* QR Code & Sharing */}
        <div className="space-y-6">
          <div className="bg-slate-700/50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FaQrcode className="text-blue-400" />
              Easy Student Access
            </h3>
            <div className="bg-white p-4 rounded-lg mb-4">
              <div className="w-32 h-32 bg-gray-200 mx-auto rounded-lg flex items-center justify-center">
                <FaQrcode className="text-4xl text-gray-400" />
              </div>
            </div>
            <p className="text-sm text-gray-300 text-center">
              Students scan QR code to join instantly
            </p>
          </div>

          <div className="bg-slate-700/50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Poll Settings</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Category</span>
                <span className="badge badge-primary capitalize">{category}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Options</span>
                <span className="text-white font-medium">{options.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Real-time Updates</span>
                <span className="text-green-400">✓ Enabled</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/30">
            <h3 className="text-lg font-bold text-white mb-2">💡 Pro Tip</h3>
            <p className="text-sm text-gray-300">
              Keep options short and clear. Students respond better to concise choices that are easy to read on mobile devices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PollPreview;