import { Item } from "../models/items.model.js";

export const postItems = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      imageUrl,
      categoryId,
      isAvailable,
      type,
    } = req.body;

    if (!name || !description || !price || !imageUrl || !categoryId || !type) {
      return res.status(400).json({ message: "Something is missing" });
    }

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

    const items = await Item.find({ categoryId:id, isAvailable: true }).populate("categoryId");

    res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    console.error("Error fetching items by category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
