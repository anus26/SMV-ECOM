import  express  from "express";
import { order } from '../controllers/order.contollers.js'
import { authmiddleware } from "../middleware/user.middleware.js";
const orderrouter=express.Router()
orderrouter.post("/orderadd",authmiddleware,order)
export default orderrouter