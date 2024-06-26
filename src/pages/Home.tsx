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
        <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/path-to-your-image.jpg)' }}>
            <div className="container mx-auto p-4">
                <header className="flex justify-between items-center py-6">
                    <h1 className="text-3xl font-bold text-black">AgriDosth</h1>
                    <nav>
                        {user ? (
                            <button 
                                type="button" 
                                onClick={handleSignOut} 
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                            >
                                Sign Out
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-4">
                                    Login
                                </Link>
                                <Link to="/signup" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mr-4">
                                    Signup
                                </Link>
                                <Link to="/otp-signin" className="bg-slate-500 text-white py-2 px-4 rounded hover:bg-slate-600">
                                    OTP Signin
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <main className="mt-10 text-center">
                    <h2 className="text-2xl font-bold text-white mb-6">Welcome to AgriDosth</h2>
                    {user && <p className="text-lg text-white mb-6">Welcome, {user.email}</p>}
                    <div className="flex justify-center">
                        <Link to="/products" className="bg-yellow-500 text-white py-3 px-6 rounded hover:bg-yellow-600">
                            Shop Now
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Home;
