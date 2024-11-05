// LoginPage.js
import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex justify-center bg-base-200 h-screen  p-4">
      <div className="w-full max-w-md  rounded-lg  p-8">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">Login</h2>
        
        <form className="space-y-4">
          {/* Email Input */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-gray-200">Email</span>
            </label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="input input-bordered w-full bg-gray-700 text-white focus:outline-none focus:ring focus:ring-primary" 
              required 
            />
          </div>

          {/* Password Input */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-gray-200">Password</span>
            </label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              className="input input-bordered w-full bg-gray-700 text-white focus:outline-none focus:ring focus:ring-primary" 
              required 
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
          </div>

          {/* Submit Button */}
          <div>
            <button 
              type="submit" 
              className="btn btn-primary w-full text-white"
            >
              Login
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="divider text-gray-400">OR</div>

        {/* Sign Up Link */}
        <p className="text-center text-gray-300">
          Don’t have an account?{' '}
          <a href="#" className="text-primary hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
