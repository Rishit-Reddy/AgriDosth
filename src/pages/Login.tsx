// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { signInWithEmail, googleSignIn } from '../redux/auth/authSlice';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signInWithEmail({ email, password }));
  };
  
  const handleGoogleSignIn = () => {
    dispatch(googleSignIn());
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <p></p>
        <button type="submit" disabled={loading}>
          Login
        </button>
        <br />
        <p>or</p>
        <button type='button' onClick={handleGoogleSignIn}>Continue with Google</button>
        {error && <p>{error}</p>}
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
};

export default LoginPage;
