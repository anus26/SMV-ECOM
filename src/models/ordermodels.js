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

buyerId: {
  type: mongoose.Schema.Types.ObjectId,
  ref:"Buy"
},
    totalAmount:{type:Number,
      required:true
    },

      // Payment Method
  paymentMethod: {
    type: String,
    enum: ["JazzCash", "EasyPaisa", "Cash", "Bank", "Stripe"],
    required: true,
  },

    status:{
      type:String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    orderStatus:{
      type:String,
      enum:["Pending","Processing","Shipped", "Delivered", "Cancelled"],
      default:"Pending"
    },
    stripePaymentIntentId:String
},{timestamps:true})
const Order=mongoose.model("order",orderSchema)
export default Order