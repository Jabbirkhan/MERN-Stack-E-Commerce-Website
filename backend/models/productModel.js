// backend/models/productModel.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    sizes: { type: Array, required: true },
    bestseller: { type: Boolean },
    images: { type: Array, required: true },
  },
  { timestamps: true }
);

export const productModel = mongoose.models.Product || mongoose.model("Product", productSchema);
