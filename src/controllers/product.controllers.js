import Product from "../models/product.models";

const productadd=async(req,res)=>{
    if (!req.file) {
return res.status(400).json({ message: "No image file uploaded" });
}
const image=req.file.path
    try {
        const {title,description,price,stock,sellerId}=req.body
        const product= Product({
            title,description,price,stock,sellerId,image
        })
        await product.save()
        res.status(201).json({message:'Product add successfully'})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"internal server error"})
        
    }

}
export {productadd}