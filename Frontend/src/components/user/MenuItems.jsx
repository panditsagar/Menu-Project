import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getItem } from "../../redux/ItemSlice.js";


const MenuItems = () => {
    const { id } = useParams();
    const { item } = useSelector(state => state.items);
    const [loadingMap, setLoadingMap] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get(
                    `https://menu-project-ks8n.onrender.com/api/v1/items/get/${id}`, { withCredentials: true }
                );
                if (res.data.success) {
                    dispatch(getItem(res.data.items));
                }
            } catch (err) {
                console.error("Error fetching items:", err);
            }
        }
        fetchItems();
    }, [id, dispatch]);


    const handleImageLoad = (itemId) => {
        setTimeout(() => {
            setLoadingMap(prev => ({ ...prev, [itemId]: false }));
        }, 2500);
    };


    return (
        <>
            <div className="p-4 pb-2">
                <h1 className="text-black text-3xl font-semibold px-1">
                    {item[0]?.categoryId?.name || "Menu"}
                </h1>
                <hr className="text-gray-300" />
            </div>

            <div className="p-4 w-full mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
                {item
                    ?.filter(item => item.isAvailable).map((item) => (
                        <div key={item._id} className="flex bg-white overflow-hidden">
                            <div className="w-1/2 h-full relative">
                                {loadingMap[item._id] !== false && (
                                    <img
                                        src="/loading-Image.gif"
                                        alt="Loading..."
                                        className="absolute w-full h-[180px] object-cover top-0 left-0 z-10"
                                    />
                                )}
                                <img
                                    src={item?.imageUrl}
                                    alt={item?.name}
                                    className="w-full h-[180px] object-cover transition-opacity duration-3000 "
                                    onLoad={() => handleImageLoad(item._id)}
                                />
                            </div>
                            <div className="flex flex-col justify-between flex-1 bg-[#F6F6F6] px-2 py-4">
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900 leading-none">{item?.name}</h3>
                                    <p className="text-xs text-gray-600 mt-1">{item?.description}</p>
                                    <div className="text-xs text-green-600 font-medium mt-1">{item?.type}</div>
                                </div>
                                <div className="text-sm font-semibold text-gray-800 mt-2">₹{item?.price}</div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default MenuItems;
