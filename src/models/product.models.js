import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:String,required:true},
    stock:{type:String,required:true},
    image:{type:String},
      category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },


},{timestamps:true})
const Product=mongoose.model("product",productSchema)
export default Product;