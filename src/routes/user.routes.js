import express from "express";
import { alluser, forgetpassword, getMe, logout, resendotp, resetpass,  sendMailocn, sigin, sigup, userbyId, verifyToken } from "../controllers/user.controllers.js";
import { authmiddleware, authorizationRole, validationmiddleware } from "../middleware/user.middleware.js";
const router=express.Router()
router.post("/signup",validationmiddleware,sigup)
router.post("/signin",sigin)
router.get("/alluser",authmiddleware,authorizationRole('Admin'),alluser)
router.get("/user/:id",authmiddleware,authorizationRole('Admin'),userbyId)
router.get("/me",authmiddleware,getMe)
router.post("/logout",authmiddleware,logout)
router.post("/send",sendMailocn)
router.post("/forgot",forgetpassword)
router.post("/verify",verifyToken)
router.post("/reset",resetpass)
router.post("/resendotp",resendotp)
export default router
