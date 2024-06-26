// src/pages/OtpSignInPage.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { clearMessage } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import PhoneNumberInput from '../components/PhoneNumberInput';
import OtpVerification from '../components/OtpVerification';

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
    <div>
      <h1>OTP Sign-In</h1>
      {!confirmationResult ? <PhoneNumberInput /> : <OtpVerification />}
    </div>
  );
};

export default OtpSignInPage;
