import express from "express";
import { alluser, logout, sigin, sigup, userbyId } from "../controllers/user.controllers.js";
import { authmiddleware, authorizationRole, validationmiddleware } from "../middleware/user.middleware.js";
const router=express.Router()
router.post("/sigup",validationmiddleware,sigup)
router.post("/sigin",sigin)
router.get("/alluser",authmiddleware,authorizationRole('Admin'),alluser)
router.get("/user/:id",authmiddleware,authorizationRole('Admin'),userbyId)
router.delete("/delete/:id",authmiddleware,authorizationRole('Admin'),logout)
export default router
