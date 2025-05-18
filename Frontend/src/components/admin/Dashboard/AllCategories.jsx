import React, { useState } from "react";
import axios from "axios";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const AllCategories = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setName(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image) {
      alert("Please provide name and image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", image); // Match backend multer config

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/categories/post",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        alert("Category added successfully!");
        // Optionally reset form
        setName("");
        setImage(null);
        setImagePreview(null);
      } else {
        alert(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error uploading:", err);
      alert("Error uploading category");
    }
  };


  const categories = [
    { id: 1, name: "Appetizers", imageURL: "https://d37byfojjwz7vp.cloudfront.net/new_resize_220_20240719135301221146.png" },
    { id: 2, name: "Main Courses", imageURL: "https://d37byfojjwz7vp.cloudfront.net/new_resize_220_20240719135301221146.png" },
    { id: 3, name: "Desserts", imageURL: "https://d37byfojjwz7vp.cloudfront.net/new_resize_220_20240719135301221146.png" },
    { id: 4, name: "Beverages", imageURL: "https://d37byfojjwz7vp.cloudfront.net/new_resize_220_20240719135301221146.png" },
    { id: 5, name: "Salads", imageURL: "https://d37byfojjwz7vp.cloudfront.net/new_resize_220_20240719135301221146.png" },
    { id: 6, name: "Soups", imageURL: "https://d37byfojjwz7vp.cloudfront.net/new_resize_220_20240719135301221146.png" },
    { id: 7, name: "Snacks", imageURL: "https://d37byfojjwz7vp.cloudfront.net/new_resize_220_20240719135301221146.png" },
    { id: 8, name: "Sides", imageURL: "https://d37byfojjwz7vp.cloudfront.net/new_resize_220_20240719135301221146.png" },
    { id: 9, name: "Breakfast", imageURL: "https://d37byfojjwz7vp.cloudfront.net/new_resize_220_20240719135301221146.png" },
    { id: 10, name: "Brunch", imageURL: "https://d37byfojjwz7vp.cloudfront.net/new_resize_220_20240719135301221146.png" }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-1">
      <div className="w-full max-w-5xl space-y-1">

        {/* Form Section */}
        <div className="bg-white px-6 pb-6 md:px-6 md:pb-6 shadow-md">
          <h1 className="text-xl pt-4 md:pb-1  text-gray-900">Add Menu Categories</h1>

          <form className="flex flex-col gap-6 " onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Category Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Enter category name"
                className="w-full lg:w-1/2 border border-gray-300 px-4 py-2 outline-none "
              />
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-1">Upload image</label>
              <label
                htmlFor="image-upload"
                className="relative flex items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300  cursor-pointer bg-gray-50  transition"
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
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="col-span-2">
              <button
                type="submit"
                className="w-full md:w-auto cursor-pointer text-white bg-black px-6 py-2 border border-gray-300 transition"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>

        {/* Category Table Section */}
        <div className="bg-white p-4 md:p-6  shadow-md overflow-x-auto">
          <h1 className="text-xl pb-3 text-gray-400">All Menu Categories</h1>
          <table className="w-full min-w-[400px]">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-600 border-b">#</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 border-b">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 border-b">Image</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">No categories available.</td>
                </tr>
              ) : (
                categories.map((cat, index) => (
                  <tr key={cat.id} className="hover:bg-gray-50 transition border-b last:border-0 cursor-pointer">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-700">{cat.name}</td>
                    <td className="py-3 px-4">
                      <img
                        src={cat.imageURL}
                        alt={cat.name}
                        className="h-12 w-12  object-cover border border-gray-300 "
                      />
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

export default AllCategories;
