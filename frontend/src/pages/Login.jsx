import React, { useEffect, useState } from "react";
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

          <div>
            <label className="block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
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
  );
};

export default Login;
