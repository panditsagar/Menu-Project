import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const MenuItems = () => {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [loadingMap, setLoadingMap] = useState({});

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
      }
    };
    fetchItems();
  }, [id]);

  const handleImageLoad = (itemId) => {
    setTimeout(() => {
      setLoadingMap((prev) => ({ ...prev, [itemId]: false }));
    }, 2500);
  };

  return (
    <>
      <div className="p-4  flex items-center gap-2 bg-white shadow-md mx-auto w-full max-w-5xl">
        <Link to={`/menu/categories`}>
          <KeyboardBackspaceIcon className=" w-full  text-gray-800  cursor-pointer" />
        </Link>
        <h1 className="text-black text-2xl font-semibold ">
          {item[0]?.categoryId?.name || "Menu"}
        </h1>
      </div>

      <div className="p-4   grid grid-cols-1 sm:grid-cols-2 gap-6 mx-auto w-full max-w-5xl">
        {item
          ?.filter((item) => item.isAvailable)
          .map((item) => (
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
