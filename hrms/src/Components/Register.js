// src/components/Registration.js

import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const data = {
        username: username,
        password: password
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://localhost:7144/api/LeaveManagement/register', data);
            alert('Registration successful. You can now login.');
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 px-4 py-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Registration</h2>
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
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
