import jwt from 'jsonwebtoken';


const createTokencookie=(res,userId)=>{
    const token =jwt.sign({userId},process.env.JWT,{

    })
    res.cookie('jwt',token ,{
        httpOnly:true,   
        secure:true,
        sameSite:"None" , 
        maxAge: 10 * 24 * 60 * 60 * 1000  
    })
}
export default createTokencookie