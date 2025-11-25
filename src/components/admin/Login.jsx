import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';

const Login = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }
const BASE_URL = import.meta.env.VITE_BASE_URL;

    const handleClick = async (e) => {
        e.preventDefault();
   console.log(loginData);
        try {
            const res = await axios.post(`${BASE_URL}admin/login`, loginData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (res.data.success) {
                navigate("/admin/dashboard");
                toast.success(res.data.message);

            }

        } catch (error) {
            console.error('Error during login:', error);
            toast.error(error.response.data.message);
        }

        setLoginData({
            username: '',
            password: '',
        });
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
            <div className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-white py-10 px-6 md:px-10 shadow-lg ">
                <div className="flex flex-col items-center mb-8">

                    <img
                        src="/logo.jpg"
                        alt="One8 Commune Logo"
                        className="w-28 h-28 mx-auto rounded-full"
                    />

                    <h1 className="text-2xl md:text-3xl font-serif font-medium text-gray-900">
                        Welcome back
                    </h1>
                    <p className="text-gray-500 text-sm text-center mt-1">
                        Enter your credentials to access your account
                    </p>
                </div>

                <form className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            name="username"
                            onChange={handleChange}
                            value={loginData.username}
                            type="text"
                            placeholder="Enter your username"
                            className="w-full border border-gray-300 px-4 py-2 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            name='password'
                            onChange={handleChange}
                            value={loginData.password}
                            type="password"
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 px-4 py-2 outline-none"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="text-gray-700">Remember me</span>
                        </label>
                        <p href="#" className="text-black text-m font-semibold">
                            Forgot Password
                        </p>
                    </div>

                    <button
                        onClick={handleClick}
                        type="submit"
                        className="w-full bg-black text-white py-2 cursor-pointer  font-medium hover:opacity-90 transition"
                    >
                        LOGIN
                    </button>

                    <button
                        type="button"
                        className="w-full flex items-center justify-center border border-gray-300 p-1 hover:bg-gray-50 transition"
                    >
                        <img
                            src="/Google_Icons.webp"
                            alt="Google"
                            className="w-7 h-7 mr-2"
                        />
                        Sign In with Google
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Don’t have an account?{' '}
                    <a className="text-black font-medium cursor-pointer">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}


export default Login;