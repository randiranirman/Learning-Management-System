
    
import React, { useEffect, useState } from "react";

import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { loginassests } from "../assets/assets.js";
import { bgassests } from "../assets/assets.js";

const Login = () => {

import { useContext } from "react";
import {login} from "../utils/authService";
import { AuthContext } from "../auth/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {setUserRole}=useContext(AuthContext);
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);




  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const loginResponse= await login(username, password);
      const role = loginResponse;
      
      setUserRole(role);
      const isFirstLogin = localStorage.getItem("isFirstLogin");
      if( isFirstLogin === "true"){
        navigate("/firstLogin");
        return;

      if (!response.ok) {
        throw new Error(data.message || "Login failed!");

      }

      if( role =="admin"){
        navigate("/admin");
      }else if ( role =="teacher"){
        navigate("/teacher");
      } else if ( role =="student"){
        navigate("/student");
      } else {
        navigate("/unauthorized")
          setError("Unauthorized ") 
          
      }
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

    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div
        className={`w-full max-w-md p-8 bg-white rounded-2xl shadow-lg transform transition-all duration-700 ${
          fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back</h2>
        <p className="text-gray-500 text-center mb-6">Sign in to your account</p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
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

          <button
            type="submit"
            className="w-full py-3 text-white bg-primary rounded-lg hover:bg-opacity-90 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500">
          Forgot your password?{" "}
          <a href="/forgot-password" className="text-primary font-semibold">
            Reset it here
          </a>
        </p>

      </div>
    </div>
    </div>
  );
};

export default Login;
