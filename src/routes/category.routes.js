import  express  from "express";
import { categoryadd, get} from "../controllers/category.controllers.js"
const categoryrouter=express.Router()
categoryrouter.post("/add",categoryadd)
categoryrouter.get('/get/:id',get)
export default categoryrouter