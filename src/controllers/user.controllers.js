import createTokencookie from "../../jwt/genrettoken.js";
import User from "../models/user.models.js"
import bcrypt, { hash }  from "bcryptjs";
import crypto from 'crypto'
import { sendMail } from "../utils/nodmailor/sendMail.js";

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
     
      const token=  createTokencookie(res,user)

const {password:_,...safeUser}=user._doc
        res.status(201).json({message:"user singup successfully",safeUser, jwt:token, })
    
        
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
         return  res.status(401).json({error:"Password not isMatch "})   
    }
    if (user.isBlocked) {
          return res.status(403).json({ message: "Your account is blocked" });
    }
    if (user.role === "seller" && !user.isApproved) {
  return res.status(403).json({
    message: "Seller not approved yet" 
  });
}

    const token=createTokencookie(res,user)
 
const safeUser = user.toObject()
delete safeUser.password
    res.status(200).json({message:"user singin successfully",safeUser,jwt:token})
}
         catch (error) {
         console.log(error);
        res.status(500).json({error:"internal server error"})
    }
}

const alluser=async(req,res)=>{
    try {
        let user
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

const  sendMailocn=async(req,res) =>{
    try {
        const {to,subject,text}=req.body
        if (!to||!subject||!text ) {
                  return res.status(400).json({ error: "Please provide to, subject, and text" });
        }
        await sendMail(to,subject,text)
            res.status(200).json({ message: "Email sent successfully" });

    } catch (error) {
           res.status(500).json({ error: "Internal server error" });
    }
}

const generateOTP = () => {
return Math.floor(100000 + Math.random() * 900000).toString();
};
const forgetpassword=async(req,res)=>{
    const {email}=req.body
    const user=await User.findOne({email})
    if (!user) {
        return res.status(400).json({messages:"email not found"})
    }

    

  const otp = generateOTP();

  user.otp = otp;
  user.otpExpire = Date.now() + 5 * 60 * 1000; 

await user.save()

        // 5. Send email with reset link
    const subject = "Password Reset OTP";
  const   text= `Your OTP is ${otp}. It will expire in 5 minutes.`

  await sendMail(user.email,subject,text)
  return res.status(200).json({messages:"Password reset email sent successfully"})

}

//     const { token } = req.params;
//     const { password } = req.body;

//     const user = await User.findOne({
//       otp: token,
//       otpExpire: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(400).json({
//         message: "Invalid or expired OTP",
//       });
//     }

//     user.password = password;
//     user.password = await bcrypt.hash(password, 10)
//     user.otp = undefined;
//     user.otpExpire = undefined;

//     await user.save();

//     res.status(200).json({
//       message: "Password reset successful",
//     });
//   } catch (error) {
//     console.error("Reset Password Error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

const verifyToken=async(req,res)=>{
      console.log("BODY:", req.body); 
    const {email,otp}=req.body
    const user=await User.findOne({email})
    if (!user) {
        return res.status(400).json({message:"user not exist"})
    }
     if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
     if(user.otpExpire < Date.now())return res.status(400).json({messages:"OTP Expired"})
              return res.status(200).json({ message: "OTP verified successfully" });   
    }



    const resetpass = async (req, res) => {
  const { email, otp, newpassword } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not found" });

  if (user.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (user.otpExpire < Date.now()) {
    return res.status(400).json({ message: "OTP expired" });
  }

  const hashpassword = await bcrypt.hash(newpassword, 10);

  user.password = hashpassword;
  user.otp = null;
  user.otpExpire = null;

  await user.save();

  res.status(200).json({ message: "Password reset successful" });
};

const resendotp = async (req, res) => {
  try {
    const { email } = req.body;


    const user = await User.findOne({ email });
 if (!user) {
      return res.status(400).json({ message: "User not found" });
    }





console.log("USER FOUND:", user);
const otp=generateOTP()
    user.otp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000;

    await user.save();

   const subject = "OTP Resend";
  const   text= `Your OTP is ${otp}. It will expire in 5 minutes.`
    await sendMail(user.email, subject,text);

    res.status(200).json({ messagesotp: "OTP resent successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ messagesotp: "Server error" });
  }
};


export {sigup,sigin,alluser,userbyId,logout,getMe,sendMailocn,forgetpassword,verifyToken,resetpass,resendotp}