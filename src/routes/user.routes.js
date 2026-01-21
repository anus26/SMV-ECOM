import express from "express";
import { alluser, sigin, sigup } from "../controllers/user.controllers.js";
import { authmiddleware, authorizationRole, validationmiddleware } from "../middleware/user.middleware.js";
const router=express.Router()
router.post("/sigup",validationmiddleware,sigup)
router.post("/sigin",sigin)
router.get("/alluser",authmiddleware,authorizationRole('Admin'),alluser)
export default router
