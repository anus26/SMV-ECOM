import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB);
    console.log(`✅ MongoDB connected !! DB Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("❌ MONGODB connection FAILED:", error.message);
    // process.exit(1);  <-- ye hata diya
  }
};

export default connectDB;