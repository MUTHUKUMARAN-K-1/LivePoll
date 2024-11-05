import React from "react";

function Register() {
  return (
    <div className=" flex justify-center p-4">
      <div className="w-full max-w-md  rounded-lg ">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Sign Up
        </h2>

        <form className="space-y-4">
          {/* Username Input */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-gray-200">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="input input-bordered w-full bg-gray-700 text-white focus:outline-none focus:ring focus:ring-primary"
              required
            />
          </div>

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


          {/* Submit Button */}
          <div>
            <button type="submit" className="btn btn-primary w-full text-white mt-4">
              Sign Up
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="divider text-gray-400">OR</div>

        {/* Login Link */}
        <p className="text-center text-gray-300">
          Already have an account?{" "}
          <a href="#" className="text-primary hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
