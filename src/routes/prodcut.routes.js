import  express  from "express";
import { deleteproduct,  getallproduct, getoneproduct, getproductcategory, productadd, updateproduct } from "../controllers/product.controllers.js";
import upload from "../uploads/multer.js";
import { authmiddleware, authorizationRole } from "../middleware/user.middleware.js";

const productrouter=express.Router()
productrouter.post("/add",upload.single("image"),authmiddleware,authorizationRole("seller"), productadd)
productrouter.put("/update/:id", 
    upload.single("image"),authmiddleware,authorizationRole("seller"),
     updateproduct)
productrouter.get("/get", getallproduct) 
productrouter.get("/oneproduct/:id",getoneproduct)    
productrouter.delete("/deleteproduct/:id",deleteproduct)
productrouter.get("/get/:id",getproductcategory)
export default  productrouter

