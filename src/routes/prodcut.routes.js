import  express  from "express";
import { productadd } from "../controllers/product.controllers.js";
import upload from "../uploads/multer.js";

const productrouter=express.Router()
productrouter.post("/add",upload.single("image"), productadd)
export default  productrouter

