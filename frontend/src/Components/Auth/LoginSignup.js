// src/LoginSignup.js
import React, { useState } from 'react';
import axios from 'axios';
import VerifyOtp from './VerifyOtp';
//import {PhoneContext } from './PhoneContext';
import { useDispatch } from 'react-redux';
import { setPhone } from '../../actions/index';
import './LoginSignup.css'; 

function LoginSignup() {
  //const [phone, setPhone] = useState('');
  const [phoneInput , setPhoneInput ] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const formatPhoneNumber = (number) => {
    return `+91${number}`;
  };

  const checkPhoneAndSendOtp = async () => {
    try {
      setError('');
      const formattedPhone = formatPhoneNumber(phoneInput);

      // Check phone number and create new user if not exists
      const checkPhoneResponse = await axios.post('http://localhost:3000/auth/check-phone', { phone: formattedPhone });
      
      if (checkPhoneResponse.data === 'New user created' || checkPhoneResponse.data === 'Phone number exists') {
        // Send OTP
        const response = await axios.post('http://localhost:3000/auth/send-otp', { phone: formattedPhone });
        if (response.status === 200) {
          setIsOtpSent(true);
          dispatch(setPhone(formattedPhone));
        }
      }
    } catch (error) {
      setError('Error checking phone number or sending OTP. Please try again.');
      console.error('Error checking phone number or sending OTP', error);
    }
  };

  return (
    <div className="login-container">
      {isOtpSent ? (
        <VerifyOtp phone={formatPhoneNumber(phoneInput)} />
      ) : (
        <>
          <h2>Login or Signup</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              checkPhoneAndSendOtp();
            }}
          >
            <div className="input-group">
              <label htmlFor="phone">+91</label>
              <input
                type="text"
                id="phone"
                placeholder="Mobile Number"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
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
