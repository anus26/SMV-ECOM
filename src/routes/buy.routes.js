import express from "express";
import { authmiddleware } from "../middleware/user.middleware.js";
import { buyadd } from "../controllers/buy.controllers.js";
const  buyrouter=express.Router()
buyrouter.post("/buy",authmiddleware,buyadd)
export default buyrouter