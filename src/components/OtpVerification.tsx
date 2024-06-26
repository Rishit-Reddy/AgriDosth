// src/components/OtpVerification.tsx
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { verifyOtp } from '../redux/auth/authSlice';
import { RootState } from '../redux/store';

const OtpVerification: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, confirmationResult } = useAppSelector((state: RootState) => state.auth);
  const [otp, setOtp] = useState('');

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmationResult) {
      dispatch(verifyOtp({ confirmationResult, otp }));
    }
  };

  return (
    <div>
      <form onSubmit={handleVerifyOtp}>
        <label htmlFor="otp">OTP:</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>Verify OTP</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default OtpVerification;
