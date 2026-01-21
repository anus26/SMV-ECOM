import jwt from 'jsonwebtoken';


const createTokencookie=(res,user)=>{
    const token =jwt.sign({  userId: user._id,role:user.role},process.env.JWT,{
expiresIn: "7d"
    })
    res.cookie('jwt',token ,{
        httpOnly:true,   
        secure:true,
        sameSite:"None" , 
        maxAge: 10 * 24 * 60 * 60 * 1000  
    })
}
export default createTokencookie