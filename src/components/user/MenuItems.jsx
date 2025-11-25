import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const MenuItems = () => {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true); // 🔥 Loading state

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${BASE_URL}items/get/${id}`);
        if (res.data.success) {
          setItem(res.data.items);
        }
      } catch (err) {
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false); // stop loading
      }
    };
    fetchItems();
  }, [id]);

  return (
    <>
      {/* Header */}
      <div className="p-4 flex items-center gap-2 bg-white shadow-md mx-auto w-full max-w-5xl">
        <Link to={`/menu/categories`}>
          <KeyboardBackspaceIcon className="text-gray-800 cursor-pointer" />
        </Link>
        <h1 className="text-black text-2xl font-semibold">
          {item[0]?.categoryId?.name || "Menu"}
        </h1>
      </div>

      {/* Content Section */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-6 mx-auto w-full max-w-5xl">
        {/* 🔥 LOADING SKELETON */}
        {loading &&
          [...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex bg-white overflow-hidden animate-pulse rounded"
            >
              <div className="w-1/2 h-[180px] bg-gray-300"></div>

              <div className="flex flex-col justify-between flex-1 bg-[#F6F6F6] px-3 py-4">
                <div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4 mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          ))}

        {/* 🔥 EMPTY STATE */}
        {!loading && item.filter((i) => i.isAvailable).length === 0 && (
          <div className="col-span-1 sm:col-span-2 flex flex-col items-center py-10 text-gray-300">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076503.png"
              alt="empty"
              className="w-24 mb-4 opacity-70"
            />
            <p className="text-lg font-medium">No items available</p>
            <p className="text-sm">Please check again later...</p>
          </div>
        )}

        {/* 🔥 SHOW ITEMS */}
        {!loading &&
          item
            ?.filter((item) => item.isAvailable)
            .map((item) => (
              <div key={item._id} className="flex bg-white overflow-hidden">
                <div className="w-1/2 h-full relative">
                  <img
                    src={item?.imageUrl}
                    alt={item?.name}
                    className="w-full h-[180px] object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between flex-1 bg-[#F6F6F6] px-2 py-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 leading-none">
                      {item?.name}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      {item?.description}
                    </p>
                    <div className="text-xs text-green-600 font-medium mt-1">
                      {item?.type}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-gray-800 mt-2">
                    ₹{item?.price}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default MenuItems;
