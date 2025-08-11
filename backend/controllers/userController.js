import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";
import { userModel } from "./../models/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // const token = createToken(user._id);
      // res.json({ success: true, token });
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for Register user
const registerUser = async (req, res) => {
  try {
    // 1. Get user detail from frontend
    const { name, email, password } = req.body;

    // 2. validation: check empty
    if ([name, email, password].some((fields) => fields.trim() === "")) {
      return res.json({ success: false, message: "All fields are required" });
    }

    // 3. Checking user exist or not
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({
        success: false,
        message: "User already exist with this Email!",
      });
    }

    // 4. Validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email!",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password!",
      });
    }

    // 5. Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashPasswoed = await bcrypt.hash(password, salt);

    // 6. Creating a new user
    const newUser = await userModel.create({
      name,
      email,
      password: hashPasswoed,
    });

    const token = createToken(newUser._id);

    // 7. remove password and refresh token from response
    const createdUser = await userModel.findById(newUser._id).select(
      "-password -refreshToken" // It does not select the written fields, by default all fields are selected.
    );

    // 8. check for user creation
    if (!createdUser) {
      return res.json({
        success: false,
        message: "Something went wrong while registering the user",
      });
    }

    // 9. return res
    return res.status(201).json({ success: true, token });
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for Admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.json({success: false, message:"Invalid Credentials"});
    } else{
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    }

    // if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    //   const token = jwt.sign(email + password, process.env.JWT_SECRET);
    //   res.json({ success: true, token });
    // } else {
    //   res.json({ success: true, message: "Invalid Credentials" });
    // }
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };


