import React from 'react';
import { useNavigate } from 'react-router-dom';

const MenuCategories = () => {
    const navigate = useNavigate();

    const categories = [
        {
            id: "takeoff",
            name: "Take Off Combos",
            imageUrl: "https://d37byfojjwz7vp.cloudfront.net/new_resize_220_20250429214449700388.png"
        },
        {
            id: "korean-spicy-1",
            name: "Korean Spicy Fest",
            imageUrl: "https://d37byfojjwz7vp.cloudfront.net/new_resize_220_20240719135301221146.png"
        },
        {
            id: "recommended",
            name: "BK Recommended",
            imageUrl: "https://d1rgpf387mknul.cloudfront.net/products/Home/ms/2x_ms_20250504111002113110_204x280jpg"
        },
        {
            id: "value-meals",
            name: "Value Meals",
            imageUrl: "https://d1rgpf387mknul.cloudfront.net/products/Home/ms/2x_ms_20250504110824073346_204x280jpg"
        },
        {
            id: "cricket",
            name: "Cricket Mania Deals",
            imageUrl: "https://d37byfojjwz7vp.cloudfront.net/new_resize_220_20250415123624704507.png"
        },
        {
            id: "beverages",
            name: "Beverages",
            imageUrl: "https://d37byfojjwz7vp.cloudfront.net/new_resize_220_MSPRT-30-1-30.png"
        },
        {
            id: "snacks",
            name: "Snacks",
            imageUrl: "https://d37byfojjwz7vp.cloudfront.net/new_resize_220_NMFGS-5-1-5.png"
        },
        {
            id: "crazy-deals",
            name: "Crazy App Deals",
            imageUrl: "https://d37byfojjwz7vp.cloudfront.net/new_resize_220_FLOREO-3-1-3.png"
        },
        {
            id: "whopper",
            name: "Whopper",
            imageUrl: "https://d37byfojjwz7vp.cloudfront.net/new_resize_220_20240620170610448695.png"
        },
        {
            id: "premium-burgers",
            name: "New Premium Burgers",
            imageUrl: "https://d37byfojjwz7vp.cloudfront.net/new_resize_220_TTNGET-2094-1-2094.png"
        },
        {
            id: "korean-spicy-2",
            name: "Korean Spicy Fest",
            imageUrl: "https://d37byfojjwz7vp.cloudfront.net/new_resize_220_20240719135301221146.png"
        },
    ];

    return (
        <div className="p-5 bg-[#F6F6F6]">
            {/* Header */}
            <div className="flex justify-center items-center ">
                <h1 className="text-black text-3xl font-semibold px-1">OUR MENU</h1>
            </div>
            <hr className="text-gray-300 mb-6" />
            {/* Responsive Grid Layout: 2 cols on small, 3 cols on medium+ */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="bg-white p-2 text-center shadow cursor-pointer hover:shadow-md transition"
                        onClick={() => navigate("/menu/items",{ state: { category } })}
                    >
                        <div className="w-full h-28 mx-auto overflow-hidden rounded-md">
                            <img
                                src={category.imageUrl}
                                alt={category.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="text-m mt-2 font-semibold text-black">
                            {category.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuCategories;
