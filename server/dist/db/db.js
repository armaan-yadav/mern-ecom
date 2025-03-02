import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const connectDB = async () => {
    const mongoUri = process.env.MONGO_DB_URI;
    if (!mongoUri) {
        throw new Error("MONGO_DB_URI is not defined in the environment variables");
    }
    try {
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
    }
};
export default connectDB;
