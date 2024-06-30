import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { fetchUserProfile } from "../redux/auth/authSlice";
import Navbar from "../components/Navbar/Navbar";
import MobileSearchBar from "../components/Navbar/MobileSearchbar";
import { useNavigate } from "react-router-dom";



const Home: React.FC = () => {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userProfile = useAppSelector((state) => state.auth.userProfile);
    const isProfileComplete = userProfile?.isProfileComplete;

    useEffect(() => {
        if (user && !isProfileComplete) {
          dispatch(fetchUserProfile(user.uid));
        }
      }, [user, dispatch]);
    
      useEffect(() => {
        if (userProfile && !isProfileComplete) {
          navigate('/profileupdate');
        }
      }, [userProfile, navigate]);

    return (
        <>
            <Navbar />
            <MobileSearchBar />
        </>
    );
}

export default Home;