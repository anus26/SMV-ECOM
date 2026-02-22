import mongoose from "mongoose";


const connectDB=async()=>{
    try {
        const connenctionInstance=await mongoose.connect(
            `${process.env.MONGODB}pratice`
        )
        console.log(`\nMongDB connected !! DB Host: ${connenctionInstance.connection.host}`);
        
    } catch (error) {
          console.log("MONGODB connection FAILED ", error);
    process.exit(1);
    }
}
export default  connectDB;