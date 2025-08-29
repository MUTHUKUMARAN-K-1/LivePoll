import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { loginService } from '../services/loginService';
import SpinnerLoader from '../components/Loaders/SpinnerLoader';
import InlineTextError from '../components/Errors/InlineTextError';
import useUserStore from '../store/useStore';
import { toast } from 'react-toastify';
import { FaGraduationCap, FaUsers, FaChartBar } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigator = useNavigate();
  const { setUser } = useUserStore();

  const mutation = useMutation(loginService, {
    onSuccess: (data) => {
      setUser(data?.user);
      toast.success(`Welcome back, ${data?.user?.username}! 🎉`);
      setEmail('');
      setPassword('');
      navigator('/dashboard');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    mutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-center lg:text-left">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Welcome to
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block">
                EduPoll
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              The modern polling platform that transforms how teachers engage with students and saves hours of work every week.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaGraduationCap className="text-2xl text-blue-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">For Educators</h3>
              <p className="text-sm text-gray-400">Built specifically for teaching environments</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaUsers className="text-2xl text-green-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Engage Students</h3>
              <p className="text-sm text-gray-400">Boost participation and interaction</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaChartBar className="text-2xl text-purple-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Real-Time Data</h3>
              <p className="text-sm text-gray-400">Instant feedback and analytics</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-700/50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
            <p className="text-gray-300">Sign in to continue transforming your classroom</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-200 font-medium">Email Address</span>
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="input input-bordered bg-slate-700 text-white border-slate-600 focus:border-blue-400 focus:outline-none transition-colors" 
                required 
              />
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-200 font-medium">Password</span>
              </label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter your password" 
                className="input input-bordered bg-slate-700 text-white border-slate-600 focus:border-blue-400 focus:outline-none transition-colors" 
                required 
              />
            </div>

            {/* Error Message */}
            {mutation.isError && <InlineTextError mutation={mutation} />}

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn btn-primary w-full text-lg font-semibold py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? (
                <>
                  <SpinnerLoader /> Signing In...
                </>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider text-gray-400 my-6">New to EduPoll?</div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-300 mb-4">
              Join thousands of educators already using our platform
            </p>
            <Link 
              to="/register" 
              className="btn btn-outline btn-primary w-full gap-2 hover:shadow-lg transition-all duration-200"
            >
              <FaGraduationCap /> Create Teacher Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;