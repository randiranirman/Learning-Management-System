import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logo from './Logo';

  function Login() {
     
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const validUsername = 'admin';
    const validPassword = 'password123';
  
     
    const handleSubmit = (e) => {
      e.preventDefault();
       
    if (username === validUsername && password === validPassword) {
          
        setError('');
        
        alert('Login successful!'); 
    } else {
         
        setError('Invalid username or password. Please try again.');
        }
      }
  return (
  <div >
    <div className="flex flex-col md:flex-row">
     
      <div className="flex items-center justify-center bg-white bg-cover md:w-1/2 rounded-2xl ">
        <div className="w-full max-w-md p-5 bg-white shadow-lg rounded-2xl">
         
          <div className="text-center ">
            <Logo />
          </div>

          <form onSubmit={handleSubmit}>
           
            <div className="mb-2">
              <label className="sr-only" htmlFor="username">Username</label>
              <div className="flex items-center bg-[#F3F4F6] rounded-lg p-2">
                <FaUser className="mr-2 text-gray-500" />
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
            
             {error && (
              <div className="mb-4 text-center text-red-500">{error}</div>
            )}

           
            <button
              type="submit"
              className="w-50%  bg-gradient-to-r from-[#A78BFA] to-[#7851ec] text-white py-4 rounded-2xl hover:bg-[#906EEB] transition duration-200"
            >
              Login Now
            </button>
          </form>

        
          <div className="tex2t-center mt-">
            <Link to="/lost-password" className="text-[#4B5563] text-sm ">
              Lost Password?
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-4 bg-fixed md:w-1/2 rounded-r-2xl ">
        <div className="bg-[#A78BFA] bg-opacity-50% rounded-xl p-10 text-white text-justify border-[#36454F] shadow-md">
      
            <p className="mb-1 text-xl font-bold ">"LearnSphere:</p>
          <p className="mb-1 text-xl font-bold">Simplifying </p>
          <p className="mb-1 text-xl font-bold">Learning,</p>
          <p className="mb-1 text-xl font-bold">Empowering</p>
          <p className="mb-1 text-xl font-bold"> Growth."</p>
         
          
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login