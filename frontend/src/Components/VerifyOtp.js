// src/VerifyOtp.js
import React, { useState } from 'react';
import axios from 'axios';
import './VerifyOtp.css'; // Ensure you have appropriate CSS for styling

function VerifyOtp({ phone }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState('');
  const [resendTime, setResendTime] = useState(30);
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const response = await axios.post('http://localhost:3000/verify-otp', {
        phone,
        otp: otp.join("")
      });
      if (response.status === 200) {
        setIsVerified(true);
      }
    } catch (error) {
      setError('Invalid OTP. Please try again.');
      console.error('Error verifying OTP', error);
    }
  };

  // Resend OTP Timer
  React.useEffect(() => {
    let timer;
    if (resendTime > 0) {
      timer = setTimeout(() => setResendTime(resendTime - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTime]);

  const resendOtp = async () => {
    try {
      setError('');
      await axios.post('http://localhost:3000/send-otp', { phone });
      setResendTime(30);
    } catch (error) {
      setError('Error resending OTP. Please try again.');
      console.error('Error resending OTP', error);
    }
  };

  return (
    <div className="verify-container">
      {isVerified ? (
        <h2>OTP Verified Successfully</h2>
      ) : (
        <>
          <h2>Verify with OTP</h2>
          <p>Sent to {phone}</p>
          <form onSubmit={handleSubmit}>
            <div className="otp-inputs">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  name="otp"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  required
                />
              ))}
            </div>
            <p>
              Resend OTP in: {resendTime > 0 ? `00:${resendTime < 10 ? `0${resendTime}` : resendTime}` : 
              <button type="button" onClick={resendOtp}>Resend OTP</button>}
            </p>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="verify-btn">Verify</button>
          </form>
          <p className="help-link">
            Log in using <a href="/password">Password</a>
          </p>
          <p className="help-link">
            Having trouble logging in? <a href="/get-help">Get help</a>
          </p>
        </>
      )}
    </div>
  );
}

export default VerifyOtp;
