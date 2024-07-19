// src/App.tsx
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { useAppDispatch, useAppSelector } from './hooks';
import OtpSignInPage from './pages/OtpSignIn';
import './index.css';
import Test from './pages/Test';
import './i18n';
import ProfileUpdate from './pages/ProfileUpdate';
import { setUser, clearUser } from './redux/auth/authSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import PaymentQRCode from './pages/PaymentsPage';

function App() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router basename="/AgriDosth">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/otp-signin" element={user ? <Navigate to="/" /> : <OtpSignInPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/profileupdate" element={<ProfileUpdate />} />
        <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/login" />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        <Route path='/payment' element={user ? <PaymentQRCode /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
