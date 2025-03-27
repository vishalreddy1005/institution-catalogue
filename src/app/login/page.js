'use client';
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API calls

const LoginPage = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSignUp && password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('');

        try {
            if (isSignUp) {
                // Sign-up logic: Save user data to MongoDB
                await axios.post('/api/auth/signup', { name, email, password });
                alert('Sign-up successful!');
            } else {
                // Login logic: Cross-check password
                const response = await axios.post('/api/auth/login', { email, password });
                if (response.data.success) {
                    alert('Login successful!');
                } else {
                    setError('Invalid email or password');
                }
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    {isSignUp ? 'Sign Up' : 'Login'}
                </h2>
                <form className="mt-6" onSubmit={handleSubmit}>
                    {isSignUp && (
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your name"
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    {isSignUp && (
                        <div className="mb-4">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Confirm your password"
                            />
                        </div>
                    )}
                    {error && (
                        <p className="mb-4 text-sm text-red-500">{error}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        {isSignUp ? 'Sign Up' : 'Login'}
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600">
                    {isSignUp
                        ? 'Already have an account?'
                        : "Don't have an account?"}{' '}
                    <button
                        onClick={toggleForm}
                        className="text-blue-500 hover:underline"
                    >
                        {isSignUp ? 'Login' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
