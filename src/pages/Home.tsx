import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks";
import { signOut } from "../redux/auth/authSlice";

const Home: React.FC = () => {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const handleSignOut = () => {
        dispatch(signOut());
    }

    return (
        <div>
            <h1>Welcome to AgriDosth</h1>
            {user ? (
                <>
                <p>Welcome {user.email}</p>
                <br />
                <button type="button" onClick={handleSignOut}>Sign Out</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <br />
                    <Link to="/signup">Signup</Link>
                    <br />
                    <Link to="/otp-signin">OTP Signin</Link>
                </>
            )}
        </div>
    );
}

export default Home;  