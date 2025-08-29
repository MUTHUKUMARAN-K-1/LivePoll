import React from "react";
import { Link, useLocation } from "react-router-dom";
import useUserStore from "../../store/useStore";
import ProfileImage from "./ProfileImage";
import { FaChartBar, FaUsers, FaBookmark } from "react-icons/fa";

function Header() {
  const { user } = useUserStore();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold text-white hover:text-blue-400 transition-colors">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            📊 EduPoll
          </span>
        </Link>
      </div>
      
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-2">
          {user.username ? (
            <>
              <li>
                <Link 
                  to="/dashboard" 
                  className={`gap-2 ${isActive('/dashboard') ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-slate-700'} transition-all duration-200`}
                >
                  <FaChartBar className="text-sm" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/polls" 
                  className={`gap-2 ${isActive('/polls') ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-slate-700'} transition-all duration-200`}
                >
                  <FaUsers className="text-sm" />
                  Explore
                </Link>
              </li>
              <li>
                <Link 
                  to="/bookmarks" 
                  className={`gap-2 ${isActive('/bookmarks') ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-slate-700'} transition-all duration-200`}
                >
                  <FaBookmark className="text-sm" />
                  Saved
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link 
                  to="/polls" 
                  className="text-gray-300 hover:text-white hover:bg-slate-700 transition-all duration-200"
                >
                  Explore Polls
                </Link>
              </li>
              <li>
                <Link 
                  to="/login" 
                  className="btn btn-primary btn-sm text-white"
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      
      {user.username && <ProfileImage userData={user} />}
    </div>
  );
}

export default Header;