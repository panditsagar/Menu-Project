import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AllCategories from './AllCategories';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:5000/api/v1/admin/logout", {}, { withCredentials: true });
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <>
            {/* Top Header */}
            <div className="bg-gray-100 px-4 ">
                <div className="w-full max-w-5xl mx-auto shadow-md bg-white p-4 md:p-6  flex items-center justify-between">
                    <h2 className="text-2xl md:text-2xl font-bold text-gray-800 md:text-left">
                        Admin Dashboard
                    </h2>
                    <button
                        onClick={handleLogout}
                        className=" text-white bg-black px-4 cursor-pointer py-2 "
                    >
                        Logout
                    </button>
                </div>

            </div>

            {/* Category Content */}
            <AllCategories />
        </>
    );
};

export default AdminDashboard;
