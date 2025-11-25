import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getItem } from '../../../redux/ItemSlice.js';
import { toast } from 'react-toastify';

const AllItems = () => {
    const { categoryId } = useParams();

    const { item } = useSelector((state) => state.items);
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchItems = async () => {
        try {
            const res = await axios.get(
                `${process.env.BASE_URL}items/get/${categoryId}`, { withCredentials: true }
            );
            if (res.data.success) {
                dispatch(getItem(res.data.items));
            }
        } catch (err) {
            console.error("Error fetching items:", err);
        }
    }

    useEffect(() => {
        fetchItems();
    }, [dispatch, categoryId]);

    const handleDelete = async (itemId) => {
        try {
            const res = await axios.delete(
                `${process.env.BASE_URL}items/delete/${itemId}`, { withCredentials: true }
            );
            if (res.data.success) {
                fetchItems();
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            toast.error(error.res.data.message);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-1">
            <div className="w-full max-w-5xl space-y-1">
                {/* Header with Add button */}
                <div className="flex items-center gap-3 bg-white shadow-md px-6 pb-6 md:px-6 md:pb-6">
                    <h1 className="text-xl pt-4 md:pb-1 font-semibold text-gray-900">Add Menu Item</h1>
                    <Link to={`/admin/additem/${categoryId}`}>
                        <div className="pt-3 cursor-pointer">
                            <AddCircleOutlineIcon />
                        </div>
                    </Link>
                </div>

                {/* Responsive Table */}
                <div className="bg-white p-4 md:p-6 shadow-md overflow-x-auto">
                    <h1 className="text-xl pb-3 text-gray-400">All {item?.[0]?.categoryId?.name} items</h1>
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
                            {item?.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4 text-gray-500">
                                        No Items available.
                                    </td>
                                </tr>
                            ) : (
                                item?.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition border-b last:border-0 cursor-pointer">
                                        <td className="py-3 px-4 font-medium text-gray-700 whitespace-nowrap">{item?.name}</td>
                                        <td
                                            className="py-3 px-4 font-medium text-gray-700 max-w-[160px] truncate overflow-hidden whitespace-nowrap"
                                            title={item?.description}
                                        >
                                            {item?.description}
                                        </td>
                                        <td className="py-3 px-4 font-medium text-gray-700">{item?.type}</td>
                                        <td className="py-3 px-4 font-medium text-gray-700">
                                            {item?.isAvailable ? "Available" : "Not Available"}
                                        </td>
                                        <td className="py-3 px-4 font-medium text-gray-700 whitespace-nowrap">₹ {item?.price}</td>
                                        <td className="py-3 px-4">
                                            <img
                                                src={item?.imageUrl}
                                                alt={item?.name}
                                                className="h-12 w-12 object-cover border border-gray-300"
                                            />
                                        </td>
                                        <td className="py-3 px-4 text-gray-500 text-center">
                                            <EditIcon   onClick={() => navigate(`/admin/edititem/${item._id}/${categoryId}`)}/>
                                        </td>
                                        <td className="py-3 px-4 text-gray-500 text-center">
                                            <ClearIcon onClick={() => handleDelete(item._id)} />
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
