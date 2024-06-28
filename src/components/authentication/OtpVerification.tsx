// src/components/OtpVerification.tsx
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { verifyOtp } from '../../redux/auth/authSlice';
import { RootState } from '../../redux/store';

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
      <form onSubmit={handleVerifyOtp} className="space-y-4">
        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP:</label>
        <input
          type="number"
          id="otp"
          placeholder='E.g. 123456'
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Verify OTP
        </button>
      </form>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  );
};

export default OtpVerification;
