import Category from "../models/category.models.js";
import Product from "../models/product.models.js";
import cloudinary from "../uploads/images.js";

const productadd=async(req,res)=>{
    try {
        if (!req.file) {
    return res.status(400).json({ message: "image is required" });
    }
const uploadResult = await cloudinary.uploader.upload(
  req.file.path,
  { folder: "products" }
);

        const {title,description,price,stock,category}=req.body
        const product=new Product({
            title,description,price,stock, image:uploadResult.secure_url,category
        })
        await product.save()
        res.status(201).json({message:'Product add successfully',product})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"internal server error"})
        
    }

}

const updateproduct=async(req,res)=>{
    try {
        const {id}=req.params
        const updateFields={}
        if (req.body.title) updateFields.title = req.body.title;
    if (req.body.description) updateFields.description = req.body.description;
    if (req.body.price) updateFields.price = req.body.price;
    if (req.body.stock) updateFields.stock = req.body.stock;

    if (req.file) {
        updateFields.image=req.file.path
    }
    
    const product=await Product.findByIdAndUpdate(id, { $set: updateFields },{new:true,runValidators:true})
    res.status(201).json({message:'update by one product',product})
    } catch (error) {
        console.error(error);
        return  res.status(500).json({message:"Internal server error"})
        
    }
}
const getallproduct=async(req,res)=>{
    try {
        const getproduct=await  Product.find()
        res.status(200).json({message:"Get all product",getproduct})

    } catch (error) {
                console.error(error);
        return  res.status(500).json({message:"Internal server error"})
    }
}
const getoneproduct=async(req,res)=>{
    try {
        const {id}=req.params
        const product=await Product.findById(id)
        if(!product){
            return res.status(400).json({message:"product not avalible"})
        }
        res.status(200).json({message:"get product",product})
    } catch (error) {
                console.error(error);
        return  res.status(500).json({message:"Internal server error"})
        
    }
}
const deleteproduct=async(req,res)=>{
    try {
        const {id}=req.params
        const product=await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(400).json({message:"Product Not avalible"})
        }
        res.status(200).json({message:"product delete successfully"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Internal server error"})
        
    }
}
const getproductcategory=async(req,res)=>{
    try {
      const {id}=req.params
      const category=await Category.findById(id)
         if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const childcategory=await Category.find({
        parentCategory:id
    }).select("_id")
    let product=[]
  if (childcategory.length>0 ) {
    product=await Product.find({
        category:{$in: childcategory.map(c=>c._id)}
    }).populate("category","name")
  }else{
    product=await Product.find({
      category:id
    }).populate("category","name")
  }
      
      res.status(200).json({message:"Product get successfully",product})  
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}
export {productadd,updateproduct,getallproduct,getoneproduct,deleteproduct,getproductcategory}