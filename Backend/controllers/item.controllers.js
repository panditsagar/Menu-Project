import { Item } from "../models/items.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const postItems = async (req, res) => {
  try {
    const { name, description, price, categoryId, isAvailable, type } =
      req.body;

    if (!name || !description || !price || !req.file || !categoryId) {
      return res.status(400).json({ message: "Something is missing" });
    }

    // Upload image to Cloudinary
    const fileUri = getDataUri(req.file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const imageUrl = cloudResponse.secure_url;

    const newItem = new Item({
      name,
      description,
      price,
      imageUrl,
      categoryId,
      isAvailable,
      type,
    });

    await newItem.save();
    res.status(201).json({
      message: "Item created successfully",
      success: true,
      newItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getItemsByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    const items = await Item.find({
      categoryId: id,
    }).populate("categoryId");

    res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    console.error("Error fetching items by category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
      data: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting item",
    });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, isAvailable, type } = req.body;

    let imageUrl;

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      imageUrl = cloudResponse.secure_url;
    }

    const updateData = {
      name,
      description,
      price,
      type,
      isAvailable,
    };

    if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }

    const updatedItem = await Item.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedItem) {
      return res
        .status(404)
        .json({ message: "Item not found", success: false });
    }

    res.status(200).json({
      message: "Item updated successfully",
      success: true,
      item: updatedItem,
    });
  } catch (error) {
    console.error("Error editing item:", error);
    res.status(500).json({
      success: false,
      message: "Server error while editing item",
    });
  }
};
