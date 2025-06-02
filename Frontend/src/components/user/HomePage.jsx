import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import PlaceIcon from '@mui/icons-material/Place';
import CallIcon from '@mui/icons-material/Call';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    
    return (
        <div className="min-h-screen w-full bg-cover bg-center flex flex-col items-center gap-6 p-4 bg-[url('/Home_Image.jpg')]">
            {/* Logo */}
            <div className="mt-28">
                <img
                    src="/logo.jpg"
                    alt="One8 Commune Logo"
                    className="w-28 h-28 mx-auto rounded-full"
                />
            </div>

            {/* Welcome Text */}
            <div className="text-center text-white">
                <h1 className="text-2xl font-bold">Welcome to</h1>
                <h2 className="text-2xl font-bold">Taste of the village, Bhopal</h2>
            </div>

            {/* Icons */}
            <div className="flex justify-center gap-4 ">
                <button className="bg-white rounded-full p-2 shadow-md">
                    <InstagramIcon fontSize="medium" />
                </button>
                <button className="bg-white rounded-full p-2 shadow-md">
                    <PlaceIcon fontSize="medium" />
                </button>
                <button className="bg-white rounded-full p-2 shadow-md">
                    <CallIcon fontSize="medium" />
                </button>
            </div>

            {/* Dine-in Menu Button */}
            <div className=" w-full px-4 mt-2">
                <button onClick={() => navigate('/menu/categories')} className="w-full bg-white text-black font-semibold py-3 rounded-full shadow-lg text-center border border-black cursor-pointer">
                    VIEW DINE-IN MENU
                </button>
            </div>


        </div>
    )
}

export default HomePage
