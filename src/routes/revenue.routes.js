import express from "express"
import { getdailyRevenue, getMonthlyRevenue, getTotalRevenue } from "../controllers/revenue.controllers.js"
import { authmiddleware } from "../middleware/user.middleware.js"

const revenuerouter=express.Router()
revenuerouter.get("/gettotal",authmiddleware, getTotalRevenue)
revenuerouter.get("/getmonthly",authmiddleware, getMonthlyRevenue)
revenuerouter.get("/getdaily",authmiddleware,getdailyRevenue)
export default revenuerouter