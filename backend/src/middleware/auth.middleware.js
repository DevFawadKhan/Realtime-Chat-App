import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';
export const protectRoute=async (req,res,next)=>{
try {
    const token=req.cookies?.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized-No token provided"});
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
    if(!decoded){
    return res.status(401).json({message:"Unauthorized-invalid token"});
    }
    const user=await User.findById(decoded.userid).select("-password"); //jo sign ki wahi userid wahi decode  ho kar check hoge.
    console.log(decoded.userid);
    console.log("Decoded:", decoded); // Check karne ke liye decoded object
    if(!user){
    return res.status(401).json({message:"User not found"});
    }
    req.user=user;
    next();
} catch (error) {
    console.log("Error in Middleware",error.message);
    res.status(500).json({message:"Internal Server error"});
}
}