import express from "express"
import { forgetpassword } from "../controllers/forgetpassword.js";

const forgetrouter=express.Router()
forgetrouter.post("/forgot-password", forgetpassword);
export default forgetrouter