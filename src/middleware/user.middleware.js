import User from "../models/user.models.js"
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

const validationmiddleware=async(req,res,next)=>{
   const {name,email,password,role}=req.body||{}
   if (!name||name.length < 3) {
      return res.status(400).json({erro:"name must be at least 3 Characters"})
   }
    if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }
  
  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }
  if(!role ){
   return res.status(400).json({error:"role is required"})
  }
   next()
}
export { authmiddleware,validationmiddleware}
