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

        const {title,description,price,stock}=req.body
        const product=new Product({
            title,description,price,stock, image:uploadResult.secure_url,
        })
        await product.save()
        res.status(201).json({message:'Product add successfully',product})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"internal server error"})
        
    }

}
export {productadd}