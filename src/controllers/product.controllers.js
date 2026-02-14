import Category from "../models/category.models.js";
import Product from "../models/product.models.js";
import cloudinary from "../uploads/images.js";
import user from "../models/user.models.js"

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
            title,description,price,stock, image:uploadResult.secure_url,category,sellerId:req.user._id
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
        const uploadResult=await cloudinary.uploader.upload(
            (req.file.path),
            {folder:"products"}
        )
         updateFields.image = uploadResult.secure_url;
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
        res.status(200).json({message:"product delete successfully" , productId: id, })
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Internal server error"})
        
    }
}
const getproductcategory=async(req,res)=>{
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
export {productadd,updateproduct,getallproduct,getoneproduct,deleteproduct,getproductcategory}