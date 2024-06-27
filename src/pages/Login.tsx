// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { signInWithEmail, googleSignIn } from '../redux/auth/authSlice';
import { RootState } from '../redux/store';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signInWithEmail({ email, password }));
  };
  
  const handleGoogleSignIn = () => {
    dispatch(googleSignIn());
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover" style={{ backgroundImage: 'url(/AgriDosth/src/assets/Auth_1_background.webp)' }}>
      <div className="bg-white mx-3 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Login
          </button>
          <p className="text-center">or</p>
          <button type='button' onClick={handleGoogleSignIn} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
            Continue with Google
          </button>
          <button type='button' onClick={() => navigate("/otp-signin")} className="w-full bg-slate-500 text-white py-2 rounded hover:bg-slate-600">
            Continue with Phone
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
        <p className="mt-4 text-center">Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
