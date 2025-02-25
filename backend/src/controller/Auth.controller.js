import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import { ganerateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js'
// Signup logic
export const Signup=async (req,res)=>{
   const {name,email,password}=req.body;
   try {
    if(password.length<6){
    return res.status(400).json({message:"Password must be at least 6 characters"});
    }
    const user=await User.findOne({email});
    if(user) return res.status(400).json({message:"Email already exist"});
    const salt= await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const NewUser=new User({  //Create object 
        name:name,
        email:email,
        password:hashedPassword,
    })
    if(NewUser){
        // ganerate jwt token here.
      ganerateToken(NewUser._id,res);
      console.log(NewUser._id);
      await NewUser.save();
      
      return res.status(201).json({
        _id:NewUser._id,
        name:NewUser.name,
        email:NewUser.email,
        profilepic:NewUser.profilepic
      });
    }else{
      res.status(400).json({message:"Invalid User data"});
    }
   } catch (error) {
    console.log("Error in Signup controller ",error.message);
    res.status(500).json({message:"Internal Server error"});
   }
}
// Login logic
export const Login=async (req,res)=>{
   const {email,password}=req.body;
   try {
    const user=await User.findOne({email});
    if(!user){
    return res.status(400).json({message:"Invalid credentials"});
    }
    const isPasswordCorrect=await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Your Password is incorrect"});
    }
    const id =user._id;
    console.log(id)
    ganerateToken(id,res);
    res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.email,
    })
   } catch (error) {
    console.log("Error in Login controller ",error.message);
    res.status(500).json({message:"Internal Server error"});
   }
}
// Logout Logic
export const Logout=(req,res)=>{
 try {
    res.cookie("token","",{maxAge:0}); //(empty string): Iska matlab hai ke cookie ki value empty kar di.
    res.status(200).json({message:"Loggout successfully"});
 } catch (error) {
    console.log("Error in Logout controller ",error.message);
    res.status(500).json({message:"Internal Server error"});
 }
}
// Update Profile
export const UpdateProfile=async (req,res)=>{
 try {
   const {profilepic}=req.body;
   const userid=req.user._id;
   if(!profilepic){
      return res.status(400).json({message:"Profile pic is required"});
   }
   const UploadResponse=await cloudinary.uploader.upload(profilepic);
   //cloudinary.uploader.upload() function se profilepic ko Cloudinary par upload kar rahe ho.
   //UploadResponse mein uploaded image ka secure_url milega, jo publicly accessible hota ha.
   const UpdateUser = await User.findByIdAndUpdate(userid, { ProfilePic: UploadResponse.secure_url },{ new: true})
   res.status(200).json(UpdateUser);
 } catch (error) {
   console.log("Error in Update-Profile controller ",error.message);
   res.status(500).json({message:"Internal Server error"});
 }  
}
// Check route for testing purpose 
export const Check=(req,res)=>{
   try {
    res.status(200).json(req.user);
   } catch (error) {
    console.log("Error in CheckAuth controller ",error.message);
    res.status(500).json({message:"Internal Server error"});
   }
}
