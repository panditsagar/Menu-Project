import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { Categories } from "../models/categories.model.js";

export const postCategories = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Name and image file are required.",
      });
    }

    // Check if category already exists
    const existingCategory = await Categories.findOne({ name });
    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category already exists.",
      });
    }

    // Upload image to Cloudinary
    const fileUri = getDataUri(req.file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const imageUrl = cloudResponse.secure_url;

    // Create and save new category
    const newCategory = new Categories({
      name,
      imageUrl,
    });

    await newCategory.save();

    return res.status(201).json({
      success: true,
      message: "Category created successfully.",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const Category = await Categories.find();

    if (!Category || Category.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No categories found",
      });
    }

    res.status(200).json({
      success: true,
      Category,
    });
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching categories",
    });
  }
};

