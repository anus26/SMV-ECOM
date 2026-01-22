import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
  cloud_name: 'dhbtwb02a',
  api_key: '<your_api_key>',
  api_secret: '<your_api_secret>'
})

const uploadimage=async(req,res)=>{
     try {
         if (!req.file) {
             return res.status(400).json({message:"Image is required"}) 
         }
         const uploadResult=await cloudinary.uploader.upload(req.file.path,{
            folder:product
         })
         return res.status(201).json({message:"Image upload successfully",image:uploadResult.secure_url})

        
     } catch (error) {
          console.error(error);
    res.status(500).json({ message: "Image upload failed", error });
  }
     
}
export default uploadimage