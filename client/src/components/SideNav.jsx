import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/css/SideNav.css'; // Import the CSS file
import logo from '../image/image.png'; // Import your logo image
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useState } from 'react';
const SideNav = () => {
    const navigate = useNavigate()
    const [user,setUser]=useState(null)

    const handleLogout = () => {
        axios.post('http://localhost:8000/api/logout',{},{withCredentials:true})
        .then(res =>{
            setUser(res.data)
            console.log(res.data)
            
        })
        .catch(err=>console.log(err))
        
        navigate('/')

    }

    return (
        <nav className="side-nav"> {/* Apply the CSS class */}
            <div className="logo ">
                <img src={logo} alt="Logo" /> {/* Insert your logo image here */}
            </div>
            <ul>
                <li>
                    <NavLink to="/shapeme/dashboard" exact activeClassName="active">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/shapeme/routines" activeClassName="active">
                        Routines
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/shapeme/profile" activeClassName="active">
                        Profile
                    </NavLink>
                </li>
            </ul>
            <div className="logout-button">
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default SideNav;
