import createTokencookie from "../../jwt/genrettoken.js";
import User from "../models/user.models.js"
import bcrypt, { hash }  from "bcryptjs";


const sigup=async(req,res)=>{
    let {name,email,password,role}=req.body
    try {
        const users=await User.findOne({email})
            if (users) {
               return res.status(400).json({message:"email already exists"})  
            }
            const hashpassword=await bcrypt.hash(password,10)
            const user=new User({
                name,email,password:hashpassword,role
            })
            await user.save()
     
        createTokencookie(res,user._id)

const {password:_,...safeUser}=user._doc
        res.status(201).json({message:"user singup successfully",safeUser})
    
        
    } catch (error) {
            console.log(error);
        res.status(500).json({error:"internal server error"})
    }
}


const sigin=async(req,res)=>{
    try{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if (!user) {
     return   res.status(401).json({error:"user not found"})  
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if (!isMatch) {
            res.status(401).json({error:"Password not isMatch "})   
    }
    createTokencookie(res,user._id)
 
    const { password: _, ...safeUser } = user._doc;
    res.status(200).json({message:"user singin successfully",safeUser})
}
         catch (error) {
         console.log(error);
        res.status(500).json({error:"internal server error"})
    }
}
export {sigup,sigin}