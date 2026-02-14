import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    stock:{type:Number,required:true},
    image:{type:String},
      category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
 sellerId: {                                // ✅ ADD THIS
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

},{timestamps:true})
const Product=mongoose.model("product",productSchema)
export default Product;