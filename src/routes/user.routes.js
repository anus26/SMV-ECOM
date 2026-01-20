import express from "express";
import { sigin, sigup } from "../controllers/user.controllers.js";
import { validationmiddleware } from "../middleware/user.middleware.js";
const router=express.Router()
router.post("/sigup",validationmiddleware,sigup)
router.post("/singin",sigin)
export default router