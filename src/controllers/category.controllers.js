import slugify from "slugify";
import Category from "../models/category.models.js"
import Product from "../models/product.models.js"

const categoryadd=async(req,res)=>{
    try {
        console.log("REQ BODY:", req.body);

        let { name, parentCategory } = req.body;
        if(!name) return res.status(400).json({message:"name is required"})
            let slug=slugify(name,{lower:true})
            let parent = null;
    if (parentCategory) {
      parent = await Category.findById(parentCategory);
      if (!parent) {
        return res.status(404).json({ message: "Parent category not found" });
      }

      // 🔥 child slug = parentSlug-childSlug
      slug = `${parent.slug}-${slug}`;
    }
      const slugExist = await Category.findOne({ slug });
    if (slugExist) {
      return res.status(400).json({ message: "Category slug already exists" });
    }
            const category= new Category({
        name,   parentCategory,slug
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
        const {parentslug,childslug}=req.params
        const parentCategory=await Category.findOne({
        slug:parentslug
        })
        if (!parentCategory) {
            return res.status(404).json({ message: "Parent category not found" });
            
        }
        let categoryIds = [];
        if (childslug) {
            const childCategory=await Category.findOne({
                slug:childslug,
                parentCategory:parentCategory._id
            })
            
            if (!childCategory) {
                return res.status(404).json({ message: "Child category not found" });
            }
            categoryIds.push(childCategory._id);

        }else{
            const childCategory=await Category.find({
                parentCategory:parentCategory._id

            }).select("_id")
            categoryIds=childCategory.map(c=>c._id)
            if (categoryIds.length===0) {
                categoryIds.push(parentCategory._id)
                
            }
        }

        const products=await Product.find({
            category:{$in:categoryIds},
        }).populate('category',"name slug")

  res.json({message:"category get successfully",products,parentCategory});
    } catch (error) {
        
  res.status(500).json({ message: "Server error" });
    }
}
const getallcategory=async(req,res)=>{
    try {
        const category=await Category.find()
        res.status(200).json({message:"All category",category})
    }
catch (error) {
        console.error(error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export {categoryadd,get,getallcategory}