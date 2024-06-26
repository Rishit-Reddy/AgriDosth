// src/pages/OtpSignInPage.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { clearMessage } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import PhoneNumberInput from '../components/authentication/PhoneNumberInput';
import OtpVerification from '../components/authentication/OtpVerification';

const OtpSignInPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, confirmationResult } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover" style={{ backgroundImage: 'url(src/assets/Auth_1_background.webp)' }}>
      <div className="bg-white mx-3 p-4 pt-3 pb-5 sm:p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold m-3 text-center">OTP Sign-In</h1>
        {!confirmationResult ? <PhoneNumberInput /> : <OtpVerification />}
      </div>
    </div>
  );
};

export default OtpSignInPage;
