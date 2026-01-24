import  express  from "express";
import { productadd, updateproduct } from "../controllers/product.controllers.js";
import upload from "../uploads/multer.js";

const productrouter=express.Router()
productrouter.post("/add",upload.single("image"), productadd)
productrouter.put("/update/:id", 
    upload.single("image"),
    
    updateproduct)
export default  productrouter

