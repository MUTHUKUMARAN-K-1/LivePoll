import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import signupUserService from "../services/signupUserService";
import InlineTextError from "../components/Errors/InlineTextError";
import SpinnerLoader from "../components/Loaders/SpinnerLoader";
import { toast } from "react-toastify";
import { FaGraduationCap, FaUsers, FaChartBar, FaRocket } from "react-icons/fa";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation(signupUserService, {
    onSuccess: (data) => {
      toast.success("🎉 Account created successfully! Please sign in.");
      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function handleSignup(e) {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    mutation.mutate({ username, email, password });
  }

  const benefits = [
    {
      icon: <FaRocket className="text-2xl text-blue-400" />,
      title: "Save 5+ Hours Weekly",
      description: "Automate feedback collection and student engagement"
    },
    {
      icon: <FaUsers className="text-2xl text-green-400" />,
      title: "Boost Participation",
      description: "85% increase in student engagement on average"
    },
    {
      icon: <FaChartBar className="text-2xl text-purple-400" />,
      title: "Real-Time Insights",
      description: "Instant analytics to adapt your teaching"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Benefits */}
        <div className="text-center lg:text-left">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Transform Your
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block">
                Teaching Today
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Join thousands of educators who are already saving time and creating more engaging classrooms with our platform.
            </p>
          </div>

          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl backdrop-blur-sm">
                <div className="p-3 bg-slate-700/50 rounded-lg">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{benefit.title}</h3>
                  <p className="text-gray-300 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-700/50">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <FaGraduationCap className="text-2xl text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Create Your Account</h2>
            <p className="text-gray-300">Start your journey to better teaching</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            {/* Username Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-200 font-medium">Full Name</span>
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter your full name"
                className="input input-bordered bg-slate-700 text-white border-slate-600 focus:border-blue-400 focus:outline-none transition-colors"
                required
              />
            </div>

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
                placeholder="Create a secure password"
                className="input input-bordered bg-slate-700 text-white border-slate-600 focus:border-blue-400 focus:outline-none transition-colors"
                required
              />
              <label className="label">
                <span className="label-text-alt text-gray-400">Minimum 6 characters</span>
              </label>
            </div>

            {/* Error Message */}
            {mutation.isError && <InlineTextError mutation={mutation} />}

            {/* Success Message */}
            {mutation.isSuccess && (
              <div className="alert alert-success">
                <span>🎉 Account created successfully! Please sign in.</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full text-lg font-semibold py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? (
                <>
                  <SpinnerLoader /> Creating Account...
                </>
              ) : (
                <>
                  <FaRocket /> Start Teaching Better
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider text-gray-400 my-6">Already have an account?</div>

          {/* Login Link */}
          <div className="text-center">
            <Link
              to="/login"
              className="btn btn-outline btn-primary w-full gap-2 hover:shadow-lg transition-all duration-200"
            >
              Sign In to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;