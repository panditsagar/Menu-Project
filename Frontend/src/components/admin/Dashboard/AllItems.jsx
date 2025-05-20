import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

const AllItems = () => {
    const category = [
        {
            name: "Margherita Pizza",
            description: "Classic cheese pizza with fresh tomatoes and basil.",
            price: 299,
            type: "veg",
            isAvailable: true,
            image: "/images/margherita.jpg",
        },
        {
            name: "Chicken Biryani",
            description: "Aromatic basmati rice cooked with marinated chicken and spices.",
            price: 349,
            type: "nonveg",
            isAvailable: true,
            image: "/images/chicken_biryani.jpg",
        },
        {
            name: "Paneer Tikka",
            description: "Grilled paneer cubes marinated in yogurt and spices.",
            price: 199,
            type: "veg",
            isAvailable: false,
            image: "/images/paneer_tikka.jpg",
        },
        {
            name: "Butter Chicken",
            description: "Creamy and rich butter chicken served with naan.",
            price: 399,
            type: "nonveg",
            isAvailable: true,
            image: "/images/butter_chicken.jpg",
        },
        {
            name: "Cold Coffee",
            description: "Chilled and creamy coffee with ice cubes.",
            price: 99,
            type: "veg",
            isAvailable: false,
            image: "/images/cold_coffee.jpg",
        },
        {
            name: "Veg Burger",
            description: "Crispy vegetable patty with lettuce and mayo in a bun.",
            price: 149,
            type: "veg",
            isAvailable: false,
            image: "/images/veg_burger.jpg",
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-1">
            <div className="w-full max-w-5xl space-y-1">
                {/* Header with Add button */}
                <div className="flex items-center gap-3 bg-white shadow-md px-6 pb-6 md:px-6 md:pb-6">
                    <h1 className="text-xl pt-4 md:pb-1 font-semibold text-gray-900">Add Menu Item</h1>
                    <Link to={"/admin/additem"}>
                        <div className="pt-3 cursor-pointer">
                            <AddCircleOutlineIcon />
                        </div>
                    </Link>
                </div>

                {/* Responsive Table */}
                <div className="bg-white p-4 md:p-6 shadow-md overflow-x-auto">
                    <h1 className="text-xl pb-3 text-gray-400">All Pizza items</h1>
                    <table className="w-full min-w-[600px]">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="text-left py-3 px-4 font-medium text-gray-600 border-b whitespace-nowrap">Name</th>                <th className="text-left py-3 px-4 font-medium text-gray-600 border-b">Description</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600 border-b">Type</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600 border-b">Availability</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-600 border-b whitespace-nowrap">Price</th>                                <th className="text-left py-3 px-4 font-medium text-gray-600 border-b">Image</th>
                                <th className="py-3 px-4 font-medium text-gray-600 border-b">Edit</th>
                                <th className="py-3 px-4 font-medium text-gray-600 border-b">Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {category.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4 text-gray-500">
                                        No Items available.
                                    </td>
                                </tr>
                            ) : (
                                category.map((cat, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition border-b last:border-0 cursor-pointer">
                                        <td className="py-3 px-4 font-medium text-gray-700 whitespace-nowrap">{cat?.name}</td>
                                        <td
                                            className="py-3 px-4 font-medium text-gray-700 max-w-[160px] truncate overflow-hidden whitespace-nowrap"
                                            title={cat.description}
                                        >
                                            {cat.description}
                                        </td>
                                        <td className="py-3 px-4 font-medium text-gray-700">{cat.type}</td>
                                        <td className="py-3 px-4 font-medium text-gray-700">
                                            {cat.isAvailable ? "Available" : "Not Available"}
                                        </td>
                                        <td className="py-3 px-4 font-medium text-gray-700 whitespace-nowrap">₹ {cat?.price}</td>
                                        <td className="py-3 px-4">
                                            <img
                                                src={cat.image}
                                                alt={cat.name}
                                                className="h-12 w-12 object-cover border border-gray-300"
                                            />
                                        </td>
                                        <td className="py-3 px-4 text-gray-500 text-center">
                                            <EditIcon />
                                        </td>
                                        <td className="py-3 px-4 text-gray-500 text-center">
                                            <ClearIcon />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllItems;
