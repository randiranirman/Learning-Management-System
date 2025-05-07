import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { changeCredentials } from '../utils/authService';
import { useNavigate } from 'react-router-dom';

const FirstLogin = () => {
  const [formDetails, setFormDetails] = useState({
    temporaryPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState({
    temporary: false,
    new: false,
    confirm: false
  });
  

  const username = localStorage.getItem("usernameFromToken");

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
    // Generate password suggestions
    
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
    
    if (name === 'newPassword') {
      checkPasswordStrength(value);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field]
    });
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1;
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1;
    
    // Contains numbers
    if (/[0-9]/.test(password)) strength += 1;
    
    // Contains special characters
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  };

  



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formDetails.newPassword !== formDetails.confirmPassword) {
      Swal.fire({
        title: 'Error!',
        text: "Passwords don't match ",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (passwordStrength < 3) {
      const result = await Swal.fire({
        title: 'Weak Password',
        text: 'Your password is not strong enough. Are you sure you want to continue?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, continue',
        cancelButtonText: 'No, I\'ll improve it'
      });
      
      if (result.isDismissed) {
        return;
      }
    }

    setLoading(true);
    setMessage('');

    try {
      const data = await changeCredentials(username, formDetails);
      setMessage(data); // success message from backend
      await Swal.fire({
        title: 'Success!',
        text: 'Your password has been updated. Please log in again.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
  
      // After user clicks OK, redirect to login
      navigate("/");
    } catch (err) {
      setMessage(err);
      Swal.fire({
        title: 'Error',
        text: err,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  const getStrengthColorClass = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary px-4">
      <div
        className={`w-full max-w-md p-8 rounded-2xl shadow-xl bg-white transform transition-opacity duration-700 ease-in-out ${
          fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <h1 className="text-3xl font-bold text-center text-primary   mb-6">
          Change Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Temporary Password
            </label>
            <div className="relative">
              <input
                type={showPassword.temporary ? "text" : "password"}
                name="temporaryPassword"
                value={formDetails.temporaryPassword}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('temporary')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword.temporary ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                value={formDetails.newPassword}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword.new ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
            
            {/* Password strength indicator */}
            {formDetails.newPassword && (
              <div className="mt-2">
                <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <div
                    className={`h-full ${getStrengthColorClass()}`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs mt-1 text-primary font-semibold">
                  Password strength: {passwordStrength <= 1 ? 'Weak' : passwordStrength <= 3 ? 'Medium' : 'Strong'}
                </p>
                <ul className="text-xs mt-1 text-primary font-semibold">
                  <li className={password => /[a-z]/.test(formDetails.newPassword) ? 'text-green-600' : ''}>
                    Include lowercase letters
                  </li>
                  <li className={password => /[A-Z]/.test(formDetails.newPassword) ? 'text-green-600' : ''}>
                    Include uppercase letters
                  </li>
                  <li className={password => /[0-9]/.test(formDetails.newPassword) ? 'text-green-600' : ''}>
                    Include numbers
                  </li>
                  <li className={password => /[^A-Za-z0-9]/.test(formDetails.newPassword) ? 'text-green-600' : ''}>
                    Include special characters (!@#$%^&*)
                  </li>
                  <li className={password => formDetails.newPassword.length >= 8 ? 'text-green-600' : ''}>
                    At least 8 characters long
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                value={formDetails.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword.confirm ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
            {formDetails.newPassword && formDetails.confirmPassword && 
              formDetails.newPassword !== formDetails.confirmPassword && (
                <p className="text-xs mt-1 text-red-600">Passwords do not match</p>
              )
            }
          </div>

  

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            {loading ? 'Updating...' : 'Change Password'}
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default FirstLogin;