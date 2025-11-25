import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MenuCategories = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}categories/getall`);
        if (res.data.success) {
          setCategory(res.data.Category);
        }
      } catch (err) {
        console.log("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);
  return (
    <div className=" bg-[#F6F6F6] mx-auto w-full max-w-5xl">
      {/* Header */}
      <div className="p-4  flex items-center justify-center gap-2 bg-white shadow-md mx-auto w-full ">
        <h1 className="text-black text-2xl font-semibold px-1">OUR MENU</h1>
      </div>
      {/* Responsive Grid Layout: 2 cols on small, 3 cols on medium+ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
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
            <p className="text-m mt-2 font-semibold text-black">{cat?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuCategories;
