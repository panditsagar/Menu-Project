import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MenuCategories = () => {

    const navigate = useNavigate();
    const { category } = useSelector((state) => state.categories);
    
    return (
        <div className="p-5 bg-[#F6F6F6]">
            {/* Header */}
            <div className="flex justify-center items-center ">
                <h1 className="text-black text-3xl font-semibold px-1">OUR MENU</h1>
            </div>
            <hr className="text-gray-300 mb-6" />
            {/* Responsive Grid Layout: 2 cols on small, 3 cols on medium+ */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {category?.map((cat) => (
                    <div
                        key={cat?._id}
                        className="bg-white p-2 text-center shadow cursor-pointer hover:shadow-md transition"
                        onClick={() => navigate(`/menu/items/${cat._id}`)}
                    >
                        <div className="w-full h-28 mx-auto overflow-hidden rounded-md">
                            <img
                                src={cat?.imageUrl}
                                alt={cat?.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="text-m mt-2 font-semibold text-black">
                            {cat?.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuCategories;
