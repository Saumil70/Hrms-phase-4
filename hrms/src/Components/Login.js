// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7144/api/LeaveManagement/login', { username, password });
         
            const { userName, userRole, userId } = response.data;

            localStorage.setItem('UserId', userId); 
            localStorage.setItem('UserRole', userRole);
            
            navigate(userRole === 'admin' ? '/AdminHomePage' : `/UserHomePage`);    
            localStorage.setItem('isLoggedIn', true);
            console.log(localStorage.getItem("isLoggedIn"));
            
        } 
        catch (error) {
            setError('Invalid username or password.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 px-4 py-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
                />


                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Login
                </button>

            </form>
        </div>
    );
};

export default Login;
