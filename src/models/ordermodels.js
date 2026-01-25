import mongoose from "mongoose";

const orderSchema=new  mongoose.Schema({
    customerid:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
items: [
  {
    productId: mongoose.Schema.Types.ObjectId,
    stock: Number,
    price: Number
  }
],
    totalAmount:{type:Number,required:true},
    status:{type:String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    }
},{timestamps:true})
const Order=mongoose.model("order",orderSchema)
export default Order