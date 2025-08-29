import React from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import { FaUser, FaChartLine, FaBookmark, FaCog, FaSignOutAlt } from 'react-icons/fa';

function ProfileImage({ userData }) {
  const { handleLogout } = useLogout();

  return (
    <div className="flex-none">
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:bg-slate-700 transition-colors">
          <div className="w-10 rounded-full ring-2 ring-blue-400/50">
            <img
              alt="Profile"
              src={`https://ui-avatars.com/api/?name=${userData?.username}&background=6366f1&color=fff&size=40`}
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-slate-800 rounded-box z-[1] mt-3 w-64 p-3 shadow-xl border border-slate-700"
        >
          {/* User Info */}
          <li className="mb-2">
            <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <FaUser className="text-white" />
              </div>
              <div>
                <p className="font-bold text-white">{userData?.username}</p>
                <p className="text-xs text-gray-400">{userData?.email}</p>
              </div>
            </div>
          </li>
          
          {/* Menu Items */}
          <li>
            <Link 
              to="/dashboard" 
              className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-slate-700 transition-all duration-200"
            >
              <FaChartLine className="text-blue-400" />
              <div>
                <span className="font-medium">Dashboard</span>
                <p className="text-xs text-gray-500">Manage your polls</p>
              </div>
            </Link>
          </li>
          
          <li>
            <Link 
              to="/analytics" 
              className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-slate-700 transition-all duration-200"
            >
              <FaChartLine className="text-green-400" />
              <div>
                <span className="font-medium">Analytics</span>
                <p className="text-xs text-gray-500">View insights</p>
              </div>
            </Link>
          </li>
          
          <li>
            <Link 
              to="/bookmarks" 
              className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-slate-700 transition-all duration-200"
            >
              <FaBookmark className="text-yellow-400" />
              <div>
                <span className="font-medium">Bookmarks</span>
                <p className="text-xs text-gray-500">Saved polls</p>
              </div>
            </Link>
          </li>
          
          <div className="divider my-2"></div>
          
          <li>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all duration-200"
            >
              <FaSignOutAlt />
              <span className="font-medium">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileImage;