import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../redux/store";
import { signUpWithEmail, clearMessage, googleSignIn } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const SignUp : React.FC = () => {

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [confirmPassword, setConfirmPassword] = React.useState<string>('');
    const dispatch = useAppDispatch();
    const { loading, error, successMessage } = useAppSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password || !confirmPassword) {
            alert("Please fill all fields");
            return;
        }
        if(password.length < 6) {
            alert("Password must be at least 6 characters long");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        dispatch(signUpWithEmail({ email, password }));
    };

    const handleGoogleSignIn = () => {
        dispatch(googleSignIn());
    }

    useEffect(() => {
        if (successMessage) {
          alert(successMessage);
          navigate('/home');  // Redirect to home page or any other page after successful signup
          dispatch(clearMessage());
        }
      }, [successMessage, navigate, dispatch]);
    

    return (
        <div>
            <h1>Sign Up</h1>
            <p>
                <button type="button" onClick={handleGoogleSignIn}>Continue with Google</button>
            </p>
            <p>or</p>
            <form onSubmit={handleSubmit}>
                <p>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </p>
                <p>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </p>
                <p>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </p>
                <button type="submit" disabled={loading}>
                    Sign Up
                </button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}

export default SignUp;