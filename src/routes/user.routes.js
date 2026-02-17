import express from "express";
import { alluser, getMe, logout, sigin, sigup, userbyId } from "../controllers/user.controllers.js";
import { authmiddleware, authorizationRole, validationmiddleware } from "../middleware/user.middleware.js";
const router=express.Router()
router.post("/signup",validationmiddleware,sigup)
router.post("/signin",sigin)
router.get("/alluser",authmiddleware,authorizationRole('Admin'),alluser)
router.get("/user/:id",authmiddleware,authorizationRole('Admin'),userbyId)
router.get("/me",authmiddleware,getMe)
router.post("/logout",authmiddleware,logout)
export default router
