import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      enum: ["veg", "nonveg"],
    },
  },
  {
    timestamps: true,
  }
);
export const Item = mongoose.model("Items", itemSchema);
