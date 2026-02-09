import  express  from "express";
import { categoryadd, get,getallcategory} from "../controllers/category.controllers.js"
import { authmiddleware } from "../middleware/user.middleware.js";
import Category from "../models/category.models.js";
const categoryrouter=express.Router()
categoryrouter.post("/add",authmiddleware, categoryadd)
categoryrouter.get('/get/:parentslug',get)
categoryrouter.get('/get/:parentslug/:childslug',get)
categoryrouter.get('/getall',getallcategory)
export default categoryrouter