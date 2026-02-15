import express from "express"
import { authmiddleware, authorizationRole } from "../middleware/user.middleware.js"
import { approveseller, blockuser, getalluser, getplatformstats } from "../controllers/admin.controllers.js"
const adminrouter=express.Router()
adminrouter.get("/user",authmiddleware ,authorizationRole("Admin"),getalluser)
adminrouter.put("/approve/:id",authmiddleware,authorizationRole("Admin"),approveseller)
adminrouter.put("/block/:id",authmiddleware,authorizationRole("Admin"),blockuser)
adminrouter.get("/stats",authmiddleware,authorizationRole("Admin"),getplatformstats)
export default adminrouter