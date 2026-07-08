import express from "express";
import { authmiddleware } from "../middleware/user.middleware.js";
import { buyadd, getbuy } from "../controllers/buy.controllers.js";
const  buyrouter=express.Router()
buyrouter.post("/buy",authmiddleware,buyadd)
buyrouter.get("/getbuy/:id",authmiddleware,getbuy)
export default buyrouter