import User from "../models/user.models"
import  jwt from 'jsonwebtoken'
const authmiddleware=async(req,res,next)=>{
         const token=req.cookies.jwt
         if (!token) {
            return res.status(401).json({message:"UnAthorized:No token Provided "})
         }
         try {
            const decoded=jwt.verify(process.env.JWT,{expirseIn:"7d"})
            req.user=decoded
            const user=await User.findById(decoded.user._id).select("-password")
            if (!user) {
                res.status(401).json({message:"No user find"})
                
            }
            req.user=user
            next()
         } catch (error) {
            return res.status(401).json({error:"Unauthorized Invalaid token"})
         }

}
export default authmiddleware
