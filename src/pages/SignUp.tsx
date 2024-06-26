import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../redux/store";
import { signUpWithEmail, clearMessage, googleSignIn } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {

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
        if (password.length < 6) {
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
        <div className="min-h-screen flex items-center justify-center bg-cover" style={{ backgroundImage: 'url(src/assets/Auth_1_background.webp)' }}>
            <div className="bg-white p-4 sm:p-8 rounded shadow-2xl w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
                <p className="text-center">
                    <button type="button" onClick={handleGoogleSignIn} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
                        Continue with Google
                    </button>
                    <button type='button' onClick={() => navigate("/otp-signin")} className="w-full bg-slate-500 text-white py-2 mt-2 rounded hover:bg-slate-600">
                        Continue with Phone
                    </button>
                </p>
                <p className="text-center my-4">or</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <p>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </p>
                    <p>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </p>
                    <p>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </p>
                    <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Sign Up
                    </button>
                </form>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
        </div>
    )
}

export default SignUp;