import mongoose from "mongoose";

const orderSchema=new  mongoose.Schema({
    customerid:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},  
  
items: [
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    quantity: Number,
    price: Number
  }
],

    totalAmount:{type:Number},
    status:{type:String,
    enum: ["pending", "paid","cancaled"],
      default: "pending",
    },
    stripePaymentIntentId:String
},{timestamps:true})
const Order=mongoose.model("order",orderSchema)
export default Order