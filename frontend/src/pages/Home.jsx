import React from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/useStore';
import { FaChartBar, FaUsers, FaRocket, FaClock, FaMobile, FaGraduationCap } from 'react-icons/fa';

function Home() {
  const navigator = useNavigate();
  const { user } = useUserStore();

  const features = [
    {
      icon: <FaRocket className="text-4xl text-blue-500" />,
      title: "Instant Poll Creation",
      description: "Create engaging polls in seconds with our intuitive interface. No more time wasted on complex setups."
    },
    {
      icon: <FaChartBar className="text-4xl text-green-500" />,
      title: "Real-Time Analytics",
      description: "Watch student responses flow in live. Get instant insights to adapt your teaching on the spot."
    },
    {
      icon: <FaUsers className="text-4xl text-purple-500" />,
      title: "Student Engagement",
      description: "Gamified voting experience that makes students excited to participate and share their thoughts."
    },
    {
      icon: <FaClock className="text-4xl text-orange-500" />,
      title: "Save Hours Weekly",
      description: "Automate feedback collection and reduce grading time with smart poll analytics and reports."
    },
    {
      icon: <FaMobile className="text-4xl text-pink-500" />,
      title: "Mobile-First Design",
      description: "Students can participate from any device. QR codes make joining polls effortless."
    },
    {
      icon: <FaGraduationCap className="text-4xl text-indigo-500" />,
      title: "Educational Focus",
      description: "Built specifically for educators with features like class management and progress tracking."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Your
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block">
                Teaching Experience
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              The ultimate polling platform designed for educators. Create engaging polls, 
              boost student participation, and save hours of work every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                className="btn btn-primary btn-lg px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={() => navigator(user.username ? "/dashboard" : "/register")}
              >
                {user.username ? "Go to Dashboard" : "Start Teaching Better"}
              </button>
              <button
                className="btn btn-outline btn-lg px-8 py-4 text-lg font-semibold text-white border-white hover:bg-white hover:text-slate-900 transform hover:scale-105 transition-all duration-200"
                onClick={() => navigator("/polls")}
              >
                Explore Polls
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Teachers Love Our Platform
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Designed by educators, for educators. Every feature is crafted to enhance your teaching workflow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-slate-700/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-slate-600/50"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-4 bg-slate-600/50 rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-12">Proven Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 p-8 rounded-2xl backdrop-blur-sm">
              <div className="text-4xl font-bold text-blue-400 mb-2">85%</div>
              <div className="text-white text-lg">Increase in Student Engagement</div>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-2xl backdrop-blur-sm">
              <div className="text-4xl font-bold text-green-400 mb-2">5 Hours</div>
              <div className="text-white text-lg">Saved Per Week on Average</div>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-2xl backdrop-blur-sm">
              <div className="text-4xl font-bold text-purple-400 mb-2">92%</div>
              <div className="text-white text-lg">Teacher Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-12 rounded-3xl shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Classroom?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of educators who are already saving time and boosting student engagement.
            </p>
            <button
              className="btn btn-lg bg-white text-blue-600 hover:bg-gray-100 px-12 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg"
              onClick={() => navigator(user.username ? "/dashboard" : "/register")}
            >
              {user.username ? "Continue Teaching" : "Get Started Free"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;