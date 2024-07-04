import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { fetchUserProfile } from "../redux/auth/authSlice";
import Navbar from "../components/Navbar/Navbar";
import MobileSearchBar from "../components/Navbar/MobileSearchbar";
import { useNavigate } from "react-router-dom";
import CategoryFilterBar from "../components/filter/CategoryFilterBar";
import ProductsDisplay from "../components/products/ProductsDisplay"; // Ensure you have this component

const Home: React.FC = () => {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userProfile = useAppSelector((state) => state.auth.userProfile);
    const isProfileComplete = userProfile?.isProfileComplete;

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [subCategory, setSubCategory] = useState('All');

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
            <CategoryFilterBar 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
              subCategory={subCategory}
              setSubCategory={setSubCategory}
            />
            <ProductsDisplay selectedCategory={selectedCategory} subCategory={subCategory} />
        </>
    );
}

export default Home;
