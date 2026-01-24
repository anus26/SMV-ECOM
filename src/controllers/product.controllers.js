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
        res.status(500).json({message:"Internal server error"})
        
    }
}
export {productadd,updateproduct}