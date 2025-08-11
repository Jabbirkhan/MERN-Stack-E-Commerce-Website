import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`);
        console.log("Database connected successfully", connectionInstance.connection.host);
    } catch (error) {
        console.log("Database connection failed", error);
    }
}

export default connectDB