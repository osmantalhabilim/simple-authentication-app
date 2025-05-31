import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database bağlantısı tamamlandı")
    } catch (error) {
        console.log(error)
    }
};