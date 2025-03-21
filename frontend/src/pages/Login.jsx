
    
import React, { useEffect, useState } from "react";
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { loginassests } from "../assets/assets.js";
import { bgassests } from "../assets/assets.js";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://localhost:7265/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed!");
      }

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      alert("Login successful!");
      window.location.href = "/admin"; 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen min-h-screen place-items-center bg-primary">
    <div className="m-10  text-white items-center w-1/2 h-1/2 justify-between bg-cover border-6 border-[#8f58ee] rounded-3xl shadow-2xl bg-fixed" style={{ backgroundImage: `url(${bgassests.bg_img})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="flex flex-col md:flex-row">
        <div className="flex items-center justify-center bg-white bg-cover md:w-1/2 rounded-2xl">
          <div className="w-full max-w-md p-5 bg-white shadow-lg rounded-2xl">
            <div className="text-center">
              <img src={loginassests.Logo_Image} className="relative inline-block w-40 h-40" />
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-2 ">
                <label className="sr-only" htmlFor="username">Username</label>
                <div className="flex items-center bg-[#F3F4F6] rounded-lg p-2 m-5">
                  <FaUser className="mb-5 mr-2 text-gray-500" />
                  <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full text-gray-700 placeholder-gray-400 bg-transparent outline-none"
                    required
                  />
                </div>
              </div>

              <div className="mb-2">
                <label className="sr-only" htmlFor="password">Password</label>
                <div className="flex items-center bg-[#F3F4F6] rounded-lg p-2">
                  <FaLock className="mr-2 text-gray-500" />
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-gray-700 placeholder-gray-400 bg-transparent outline-none"
                    required
                  />
                </div>
              </div>

              {error && <div className="mb-4 text-center text-red-500">{error}</div>}

              <button
                type="submit"
                className="m-5  bg-gradient-to-r from-[#A78BFA] to-[#7851ec] text-white   hover:bg-[#906EEB] transition duration-200"
              >
                Login Now
              </button>
            </form>

            <div className="mt-4 text-center">
              <Link to="/lost-password" className="text-[#4B5563] text-sm">
                Lost Password?
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-4 bg-fixed md:w-1/2 rounded-r-2xl ">
          <div className="bg-[#A78BFA] bg-opacity-50 rounded-xl p-10 text-white text-justify border-[#36454F] shadow-md">
            <p className="mb-1 text-xl font-bold">"LearnSphere:</p>
            <p className="mb-1 text-xl font-bold">Simplifying </p>
            <p className="mb-1 text-xl font-bold">Learning,</p>
            <p className="mb-1 text-xl font-bold">Empowering</p>
            <p className="mb-1 text-xl font-bold">Growth."</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
