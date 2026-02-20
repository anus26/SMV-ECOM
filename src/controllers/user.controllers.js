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
     
        createTokencookie(res,user._id,user.role)

const {password:_,...safeUser}=user._doc
        res.status(201).json({message:"user singup successfully",safeUser, jwt: token, })
    
        
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
    if (user.isBlocked) {
          return res.status(403).json({ message: "Your account is blocked" });
    }
    if (user.role === "seller" && !user.isApproved) {
  return res.status(403).json({
    message: "Seller not approved yet", jwt: token, 
  });
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

const alluser=async(req,res)=>{
    try {
        let User
        if (req.user.role === "customer" || req.user.role === "seller") {
            user = await User.find({ sellerId: req.user._id });  
        }else{

             user=await User.find()
        }
        res.status(200).json({message:"All user",user})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
        
    }
}
const userbyId=async(req,res)=>{
    try {
         const { id } = req.params;
        const user=await User.findById(id).select("-password")
         if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

        res.status(200).json({message:"Get by one user",user})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
        
    }
}
const getMe=async(req,res)=>{
    try {
        const userId=req.user
        const user=await User.findById(userId).select("-password")
           if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
      res.status(200).json({
      success: true,
      user,
    });
    } catch (error) {
          res.status(500).json({ message: error.message });
    }
}

const logout=async(req,res)=>{
    try {
        
    res.clearCookie('jwt')
    res.status(200).json({message:"User delete Successfully",user})
    } catch (error) {
         console.log(error);
        res.status(500).json({message:"Internal server error"}) 
    }
}


export {sigup,sigin,alluser,userbyId,logout,getMe}