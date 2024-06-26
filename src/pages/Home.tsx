import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks";

const Home : React.FC = () => { 
    const user = useAppSelector((state) => state.auth.user);
    return (
        <div>
            <h1>Welcome to AgriDosth</h1>
            {user? 
            <p>Welcome {user.email}</p> : 
            <><Link to="/login">Login</Link><br /><Link to="/signup">Signup</Link></>
            }
        </div>
    )
} 

export default Home;  