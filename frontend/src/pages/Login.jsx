import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Simulating authentication & role-based routing
    if (username === "admin" && password === "admin123") {
      navigate("/admin");
    } else if (username === "teacher" && password === "teacher123") {
      navigate("/teacher");
    } else if (username === "student" && password === "student123") {
      navigate("/student");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#5038ED] to-[#836FFF]">
      <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden w-[800px]">
        {/* Left Side - Login Form */}
        <div className="w-1/2 p-10">
          <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">
            Learn<span className="italic text-black">Sphere</span>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
            >
              Login Now
            </button>
          </form>
          <p className="text-gray-500 text-sm text-center mt-4 cursor-pointer">
            Lost Password?
          </p>
        </div>

        {/* Right Side - Quote Section */}
        <div className="w-1/2 flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-700 text-white p-8">
          <p className="text-lg font-semibold text-center">
            "LearnSphere: Simplifying Learning, Empowering Growth."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
