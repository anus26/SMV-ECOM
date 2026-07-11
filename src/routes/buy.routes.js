import express from "express";
import { authmiddleware } from "../middleware/user.middleware.js";
import { allbuy, buyadd, deletebuy, getbuy, getbuybyuser } from "../controllers/buy.controllers.js";
const  buyrouter=express.Router()
buyrouter.post("/buy",authmiddleware,buyadd)
buyrouter.get("/getbuy/:id",authmiddleware,getbuy)
buyrouter.get("/allbuy",authmiddleware,allbuy)
buyrouter.get("/getbuybyuser",authmiddleware,getbuybyuser)
buyrouter.delete("/deletebuy/:id",authmiddleware,deletebuy)
export default buyrouter