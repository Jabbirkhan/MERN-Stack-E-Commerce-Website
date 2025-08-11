import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false } // With (false) property, it is use to add the object into cartData and it shows empty object by default
);

export const userModel = mongoose.models.User || mongoose.model("User", userSchema);
