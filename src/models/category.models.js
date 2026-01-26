import mongoose, { Schema } from "mongoose";

const categorySchema=new mongoose.Schema({
    name:{tpye:String,required:true},
     parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
},{timestamps:true})
const Category=Schema.model("category",categorySchema)
export default Category