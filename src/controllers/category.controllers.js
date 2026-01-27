import Category from "../models/category.models.js"
import Product from "../models/product.models.js"

const categoryadd=async(req,res)=>{
    try {
        const {name,parentCategory}=req.body
        if(!name) return res.status(400).json({message:"name is required"})
            const category= new Category({
        name,parentCategory
        })
        await category.save()
        res.status(201).json({message:"category is add",category})
    } catch (error) {
        console.error("error",error);
        return res.status(500).json({message:"Internal server error"})
    }
}
const get=async(req,res)=>{
    try {
        const {parentId}=req.params
        const childcategory=await Category.find({
         parentCategory:parentId
        }).select("_id")
        const products=await Product.find({
            category:{$in:childcategory.map(c=>c._id)}
        }).populate('category',"name")

  res.json({message:"category get successfully",products});
    } catch (error) {
        
  res.status(500).json({ message: "Server error" });
    }
}
export {categoryadd,get}