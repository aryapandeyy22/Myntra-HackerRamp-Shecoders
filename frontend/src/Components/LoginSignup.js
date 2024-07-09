// src/LoginSignup.js
import React, { useState } from 'react';
import axios from 'axios';
import VerifyOtp from './VerifyOtp';
import './LoginSignup.css'; // Ensure you have appropriate CSS for styling

function LoginSignup() {
  const [phone, setPhone] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState('');

  const formatPhoneNumber = (number) => {
    return `+91${number}`;
  };

  const sendOtp = async () => {
    try {
      setError('');
      const formattedPhone = formatPhoneNumber(phone);
      const response = await axios.post('http://localhost:3000/send-otp', { phone: formattedPhone });
      if (response.status === 200) {
        setIsOtpSent(true);
      }
    } catch (error) {
      setError('Error sending OTP. Please try again.');
      console.error('Error sending OTP', error);
    }
  };

  return (
    <div className="login-container">
      {isOtpSent ? (
        <VerifyOtp phone={formatPhoneNumber(phone)} />
      ) : (
        <>
          <h2>Login or Signup</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendOtp();
            }}
          >
            <div className="input-group">
              <label htmlFor="phone">+91</label>
              <input
                type="text"
                id="phone"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <p>
              By continuing, I agree to the{' '}
              <a href="/terms-of-use" target="_blank" rel="noopener noreferrer">
                Terms of Use
              </a>{' '}
              &{' '}
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
            </p>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="continue-btn">
              CONTINUE
            </button>
          </form>
          <p className="help-link">
            Have trouble logging in? <a href="/get-help">Get help</a>
          </p>
        </>
      )}
    </div>
  );
}

export default LoginSignup;
