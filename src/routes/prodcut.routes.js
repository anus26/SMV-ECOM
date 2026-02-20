import  express  from "express";
import { deleteproduct,  getallproduct, getoneproduct, getproductcategory, productadd, updateproduct } from "../controllers/product.controllers.js";
import upload from "../uploads/multer.js";
import { authmiddleware, authorizationRole } from "../middleware/user.middleware.js";

const productrouter=express.Router()
productrouter.post("/add",upload.single("images",2),authmiddleware,authorizationRole("seller"), productadd)
productrouter.put("/update/:id", 
    upload.single("image"),authmiddleware,authorizationRole("seller"),
     updateproduct)
productrouter.get("/get" ,authmiddleware,getallproduct) 
productrouter.get("/oneproduct/:id",getoneproduct)    
productrouter.delete("/deleteproduct/:id",authmiddleware,authorizationRole("seller","Admin"), deleteproduct)
productrouter.get("/get/:parentslug",getproductcategory)
productrouter.get("/get/:parentslug/:childslug",getproductcategory)
export default  productrouter

