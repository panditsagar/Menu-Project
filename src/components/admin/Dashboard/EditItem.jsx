import { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function AddItem() {
  const { id, categoryId } = useParams();
  const navigate = useNavigate();
  const { item } = useSelector((state) => state.items);
  const selectedItem = item?.find((i) => i._id === id);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    type: "",
    isAvailable: false,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageUrl(null);
      setImagePreview(null);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    if (selectedItem) {
      setData({
        name: selectedItem.name || "",
        description: selectedItem.description || "",
        price: selectedItem.price || "",
        type: selectedItem.type || "",
        isAvailable: selectedItem.isAvailable || false,
      });

      // Optional image preview if image is a URL
      if (selectedItem.imageUrl) {
        setImagePreview(selectedItem.imageUrl);
      }
    }
  }, [selectedItem]);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("type", data.type);
    formData.append("isAvailable", data.isAvailable);
    if (imageUrl) {
      formData.append("file", imageUrl);
    }

    try {
      const res = await axios.put(`${BASE_URL}items/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/admin/allitem/${categoryId}`);
        setData({
          name: "",
          description: "",
          price: "",
          type: "",
          isAvailable: false,
        });
        setImagePreview(null);
        setImageUrl(null);
      }
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center ">
      <div className="w-full max-w-5xl   shadow-md ">
        <div className="flex items-center gap-2 bg-white p-6">
          <Link to={`/admin/allitem/${categoryId}`}>
            <KeyboardBackspaceIcon className=" w-full   cursor-pointer" />
          </Link>
          <h1 className="text-xl font-semibold  text-gray-900">
            Edit Menu Item
          </h1>
        </div>
        <form className="flex flex-col gap-6 mt-1 p-6 bg-white" onSubmit={handleSubmit}>
          {/* Upload Image */}
          <div>
            <label className="block text-gray-800 font-semibold mb-1">
              Upload Image
            </label>
            <label
              htmlFor="image-upload"
              className="relative flex items-center justify-center w-28 h-28 border-2 border-dashed border-gray-300 cursor-pointer bg-gray-50 transition"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400 text-sm">
                  <CloudUploadIcon />
                  Upload
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Name */}
          <div className="w-full">
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter item name"
              className="w-full md:w-1/2 border border-gray-300 px-4 py-2 outline-none  "
              required
            />
          </div>

          {/* Description */}
          <div className="w-full">
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              placeholder="Enter item description"
              className="w-full lg:w-1/2 border border-gray-300 px-4 py-2 outline-none resize-none  "
              rows={4}
              required
            />
          </div>

          {/* Price, Type, Availability - Responsive Row */}
          <div className="flex gap-8 flex-col sm:flex-row">
            {/* Price */}
            <div className="w-full md:w-1/6 ">
              <label className="block text-gray-700 font-medium mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={data.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full border border-gray-300 px-4 py-2 outline-none "
                min="0"
                required
              />
            </div>

            {/* Type */}
            <div className="w-full md:w-1/6">
              <label className="block text-gray-700 font-medium mb-1">
                Type
              </label>
              <select
                name="type"
                value={data.type}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 outline-none "
              >
                <option value="">Select type</option>
                <option value="veg">Veg</option>
                <option value="nonveg">Non-Veg</option>
              </select>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-3 sm:pt-6">
              <input
                type="checkbox"
                id="isAvailable"
                name="isAvailable"
                checked={data.isAvailable}
                onChange={handleChange}
                className="w-5 h-5 cursor-pointer"
              />
              <label
                htmlFor="isAvailable"
                className="text-gray-700 font-medium"
              >
                Available
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="sm:mt-4">
            <button
              type="submit"
              className="text-white cursor-pointer bg-black px-4 py-2  border border-gray-300 transition hover:bg-gray-800"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
