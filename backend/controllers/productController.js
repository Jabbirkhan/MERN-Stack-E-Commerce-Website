// backend/controllers/productController.js
import { v2 as cloudinary } from "cloudinary";
import { productModel } from "./../models/productModel.js";

// Function for add product
const addProduct = async (req,res) => {
    try {
        const { name, description, price, category, subcategory, sizes, bestseller } = req.body;

        // req.files.image1: Checks if the key "image1" exists in req.files.
        // req.files.image1[0]: If "image1" exists, it gets the first uploaded file from the array.
        // If "image1" does not exist, image1 is assigned undefined.

        // if (req.files.image1) { 
        //     const image1 = req.files.image1[0]; 
        // } else { 
        //     const image1 = undefined; 
        // }

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        // This line of code creates an array of images and removes any undefined values.
        // .filter((item) => item !== undefined) removes undefined values.
        const images = [image1,image2,image3,image4].filter((item) => item !== undefined);
        
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )

        // const imagesUrl = await Promise.all(
        //     images.map((item) => cloudinary.uploader.upload(item.path, { resource_type: 'image' })
        //     .then(res => res.secure_url))
        // );        
    
        const product = await productModel.create({
          name,
          description,
          price: Number(price),
          category,
          subcategory,
          bestseller: bestseller === "true" ? "true" : "false",
          sizes: JSON.parse(sizes),
          images: imagesUrl,
          date: Date.now()
        });

        // console.log(product);
        if(!product) {
            return res.json({success:false, message:"Product not added"});
        }
        
        res.json({success:true, message:"Product added successfully"});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// Function for list products
const listProducts = async (req,res) => {
    try {
        const products = await productModel.find({});
        res.json({success:true, message:"All products are received", products});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// Function for removing product
const removeProduct = async (req,res) => {
    try {
        await productModel.findOneAndDelete(req.body._id);
        res.json({success:true, message:"Product removed"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// Function for single product info
const singleProduct = async (req,res) => {
    try {
        const { productId } = req.query;
        const product = await productModel.findById(productId);
        res.json({success:true, product})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

export { addProduct, listProducts, removeProduct, singleProduct }
