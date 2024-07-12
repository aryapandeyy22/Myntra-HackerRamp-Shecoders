import React, { useState } from 'react';
import './PaymentOptions.css';

const PaymentOptions = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const renderPaymentForm = () => {
    switch (selectedOption) {
      case 'cod':
        return (
          <div className="payment-form">
            <h3>Cash on Delivery</h3>
            <button onClick={() => alert('Captcha verification')}>Verify Captcha</button>
          </div>
        );
      case 'upi':
        return (
          <div className="payment-form">
            <h3>UPI Payment</h3>
            <label>
              UPI ID:
              <input type="text" placeholder="Enter your UPI ID" />
            </label>
            <button onClick={() => alert('Proceed with UPI payment')}>Pay Now</button>
          </div>
        );
      case 'card':
        return (
          <div className="payment-form">
            <h3>Credit/Debit Card</h3>
            <label>
              Card Number:
              <input type="text" placeholder="Enter card number" />
            </label>
            <label>
              Expiry Date:
              <input type="text" placeholder="MM/YY" />
            </label>
            <label>
              CVV:
              <input type="text" placeholder="Enter CVV" />
            </label>
            <button onClick={() => alert('Proceed with card payment')}>Pay Now</button>
          </div>
        );
      default:
        return <p>Please select a payment option.</p>;
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h2>Choose Payment Mode</h2>
      </div>
      <div className="payment-options">
        <button className="payment-button" onClick={() => handleOptionChange('cod')}>
          Cash On Delivery (Cash/UPI)
        </button>
        <button className="payment-button" onClick={() => handleOptionChange('upi')}>
          UPI (Pay via any App)
        </button>
        <button className="payment-button" onClick={() => handleOptionChange('card')}>
          Credit/Debit Card
        </button>
      </div>
      <div className="payment-form-container">
        {renderPaymentForm()}
      </div>
    </div>
  );
};

export default PaymentOptions;
