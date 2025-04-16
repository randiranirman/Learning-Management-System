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

  const username = localStorage.getItem("usernameFromToken");

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formDetails.newPassword !== formDetails.confirmPassword) {
      setMessage('New passwords do not match.');
      return;
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary px-4">
      <div
        className={`w-full max-w-md p-8 rounded-2xl shadow-xl bg-white transform transition-opacity duration-700 ease-in-out ${
          fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Change Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Temporary Password
            </label>
            <input
              type="password"
              name="temporaryPassword"
              value={formDetails.temporaryPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formDetails.newPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formDetails.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
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
