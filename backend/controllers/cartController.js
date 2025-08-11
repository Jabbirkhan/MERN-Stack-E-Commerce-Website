import { userModel } from "../models/userModel.js";


// Add products to user cart
const addToCart = async (req,res) => {
    try {
        const {userId, itemId, sizes} = req.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][sizes]) {
                cartData[itemId][sizes] += 1 ;
            }else{
                cartData[itemId][sizes] = 1 ;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][sizes] = 1;
        }

        await userModel.findByIdAndUpdate(userId, {cartData});
        res.json({success:true, message:"Added to cart"});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// Update user cart
const updateCart = async (req,res) => {
    try {
        const {userId, itemId, sizes, quantity} = req.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        cartData[itemId][sizes] = quantity;

        await userModel.findByIdAndUpdate(userId, {cartData});
        res.json({success:true, message:"Cart updated"});    

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// Get user cart data
const getUserCart = async (req,res) => {
    try {
        const {userId} =req.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        res.json({success:true, cartData});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

export {addToCart, updateCart, getUserCart}