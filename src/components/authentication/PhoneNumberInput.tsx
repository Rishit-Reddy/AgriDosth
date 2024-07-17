// src/components/PhoneNumberInput.tsx
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendOtp } from '../../redux/auth/authSlice';
import { RootState } from '../../redux/store';

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
      <form onSubmit={handleSendOtp} className="space-y-4">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          placeholder='e.g. +919999999999'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="w-full px-3 mb-3 py-2 border rounded"
        />
        <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Send OTP
        </button>
      </form>
      {/* {error && <p className="text-red-500 text-center mt-2">{error}</p>} */}
      <div id="recaptcha-container" className="mt-4"></div>
    </div>
  );
};

export default PhoneNumberInput;
