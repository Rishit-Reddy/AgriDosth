// src/components/PhoneNumberInput.tsx
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { sendOtp } from '../redux/auth/authSlice';
import { RootState } from '../redux/store';

const PhoneNumberInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state: RootState) => state.auth);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(sendOtp(phoneNumber));
  };

  return (
    <div>
      <form onSubmit={handleSendOtp}>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>Send OTP</button>
      </form>
      {error && <p>{error}</p>}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default PhoneNumberInput;
