import express from "express";
import { alluser, forgetpassword, getMe, logout, resetpass, resetpassword, sendMailocn, sigin, sigup, userbyId, verifyToken } from "../controllers/user.controllers.js";
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
router.get("/resetpassword",resetpassword)
router.post("/verify",verifyToken)
router.post("/reset",resetpass)
export default router
