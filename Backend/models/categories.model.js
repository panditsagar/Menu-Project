// models/Item.js
import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Export the model
export const Categories = mongoose.model("Category", categoriesSchema);
