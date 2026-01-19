import User from "../models/user.models.js"
import bcrypt, { hash }  from "bcryptjs";


const singup=async(req,res)=>{
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
      res.status(201).json({message:"user singup successfully",user})
        
    } catch (error) {
            console.log(error);
        res.status(500).json({error:"internal server error"})
    }
}

export {singup}