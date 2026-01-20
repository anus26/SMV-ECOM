import express from "express";
import { sigin, singup } from "../controllers/user.controllers.js";
const router=express.Router()
router.post("/singup",singup)
router.post("/singin",sigin)
export default router