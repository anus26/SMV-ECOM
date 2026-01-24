import mongoose from "mongoose";

const orderSchema=new  mongoose.Schema({
    customerId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    items:{type:String,required:true},
    totalAmount:{type:String,required:true},
    status:{type:String,required:true}
},{timestamps:true})
const Order=mongoose.model("order",orderSchema)
export default Order