import  express  from "express";
import { allorder, order, orderdelete, orderget, orderupdata } from '../controllers/order.contollers.js'
import { authmiddleware, authorizationRole } from "../middleware/user.middleware.js";
const orderrouter=express.Router()
orderrouter.post("/orderadd",authmiddleware,authorizationRole('customer'),order)
orderrouter.get("/orderget/:id",authmiddleware,orderget)
orderrouter.get("/allorder",authmiddleware,authorizationRole("seller"),allorder)
orderrouter.put("/updateorder/:id",orderupdata)
orderrouter.delete("/orderdelete/:id",orderdelete)
export default orderrouter