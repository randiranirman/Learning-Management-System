import { useSearchParams } from 'react-router-dom'
import { resetPassword } from '../utils/authService';
import {useState} from 'react';

const ResetPassword = () => {

    const [searchParams]= useSearchParams();
    const email = searchParams.get('email');
     const token = searchParams.get('token');
     const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try{
        await resetPassword({ email, token, newPassword, confirmPassword });   
        setMessage("password reset successfully. You can now log in with your new password.");
    }catch(err) {
        console.error("Error resetting password:", err);
        setError("Failed to reset password. Please try again.");
    }

  }
  return (
   <>
            <h1> this is the  rest password  page </h1>
            <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          required
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}



   </>
  )
}

export default ResetPassword
