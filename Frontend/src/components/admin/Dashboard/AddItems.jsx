import { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link } from 'react-router-dom';
export default function AddItem() {
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-1">
            <div className="w-full max-w-5xl bg-white p-6 shadow-md  space-y-2">
                <Link to={"/admin/dashboard"}><KeyboardBackspaceIcon fontSize="large" className=' w-full border border-gray-500 p-1 cursor-pointer rounded-3xl' />
                </Link>
                <h1 className="text-xl font-semibold  text-gray-900">Add Menu Item</h1>

                <form className="flex flex-col gap-6">
                    {/* Upload Image */}
                    <div>
                        <label className="block text-gray-800 font-semibold mb-1">Upload Image</label>
                        <label
                            htmlFor="image-upload"
                            className="relative flex items-center justify-center w-28 h-28 border-2 border-dashed border-gray-300 cursor-pointer bg-gray-50 transition"
                        >
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
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
                                required
                            />
                        </label>
                    </div>

                    {/* Name */}
                    <div className="w-full">
                        <label className="block text-gray-700 font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter item name"
                            className="w-full md:w-1/2 border border-gray-300 px-4 py-2 outline-none  "
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="w-full">
                        <label className="block text-gray-700 font-medium mb-1">Description</label>
                        <textarea
                            name="description"
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
                            <label className="block text-gray-700 font-medium mb-1">Price</label>
                            <input
                                type="number"
                                name="price"
                                placeholder="Enter price"
                                className="w-full border border-gray-300 px-4 py-2 outline-none "
                                min="0"
                                required
                            />
                        </div>

                        {/* Type */}
                        <div className="w-full md:w-1/6">
                            <label className="block text-gray-700 font-medium mb-1">Type</label>
                            <select
                                name="type"
                                className="w-full border border-gray-300 px-3 py-2 outline-none "
                                required
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
                                className="w-5 h-5 cursor-pointer"
                            />
                            <label htmlFor="isAvailable" className="text-gray-700 font-medium">
                                Available
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className='sm:mt-4'>
                        <button
                            type="submit"
                            className="text-white  bg-black px-4 py-2  border border-gray-300 transition hover:bg-gray-800"
                        >
                            Add Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
