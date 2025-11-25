import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MenuCategories = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true); // 🔥 Loading state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}categories/getall`);
        if (res.data.success) {
          setCategory(res.data.Category);
        }
      } catch (err) {
        console.log("Error fetching categories:", err);
      } finally {
        setLoading(false); // 🔥 Stop loading
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-[#F6F6F6] mx-auto w-full max-w-5xl">

      {/* Header */}
      <div className="p-4 flex items-center justify-center gap-2 bg-white shadow-md mx-auto w-full">
        <h1 className="text-black text-2xl font-semibold px-1">OUR MENU</h1>
      </div>

      {/* Body */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">

        {/* 🔥 SHOW LOADING SKELETON */}
        {loading &&
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white p-2 rounded shadow animate-pulse"
            >
              <div className="w-full h-28 bg-gray-300 rounded-md"></div>
              <div className="h-4 mt-3 bg-gray-300 rounded w-3/4 mx-auto"></div>
            </div>
          ))
        }

        {/* 🔥 SHOW EMPTY UI */}
        {!loading && category.length === 0 && (
          <div className="col-span-2 sm:col-span-3 flex flex-col items-center py-10 text-gray-500">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076503.png"
              alt="empty"
              className="w-24 mb-4 opacity-70"
            />
            <p className="text-lg font-medium">No categories available</p>
            <p className="text-sm">Please check again later...</p>
          </div>
        )}

        {/* SHOW CATEGORY CARDS */}
        {!loading && category.map((cat) => (
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
