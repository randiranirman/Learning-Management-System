import React, { useState } from 'react'
import { requestPasswordReset } from '../utils/authService';

const RequestReset = () => {
     const [email, setEmail ]= useState("");
     const [message, setMessage] = useState("");
     const [error, setError] = useState("");


     const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try{
                await requestPasswordReset(email);
                setMessage("Password reset link sent to your email.");
        }catch(err) {
            console.error("Error requesting password reset:", err);
            setError("Failed to request password reset. Please try again.");
        }
     }
  return (
    <>
    <div>
      <h2>Request Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    
        
    </>
  )
}

export default RequestReset
