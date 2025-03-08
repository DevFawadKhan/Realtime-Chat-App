import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js"

// get all users for sidebar controller
export const getUserForSidebar=async (req,res)=>{
try {
    const loggedInUserId=req.user._id;
    const filtereduser=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
    res.status(200).json(filtereduser);
} catch (error) {
    console.log("Error in getUserForsidebar ",error.message)
    res.status(500).json({message:"Internal Server error"})
}
}
// getall Messages controller 
export const getMessage=async(req,res)=>{
  try {
    const {UserId:UserToChatId}=req.params;
    console.log("chatuserid",UserToChatId);
    const myId=req.user._id;  //middleware say arhi ha 
    const Messages=await Message.find({
        $or:[{senderid:myId,recieverid:UserToChatId},{senderid:UserToChatId,recieverid:myId}]
    })
//senderid: 123 & recieverid: 456 (tumhare bheje gaye messages)
//senderid: 456 & recieverid: 123 (tumhare paas aane wale messages)
  return res.status(200).json(Messages)
  } catch (error) {
    console.log("Error in getMessages controller ",error.message)
    res.status(500).json({message:"Internal Server error"})
  }
}
// Send Message controller
export const SendMessages= async (req,res)=>{
    try {
        const {text,image}=req.body;
        const {id:recieverId}=req.params;
        const myId=req.user._id;
        let imageUrl   // for save url in db
        if(image){
        const UploadResponse= await cloudinary.uploader.upload(image);
        imageUrl=UploadResponse.secure_url;
        }
        const newMessage=new Message({
        senderid:myId,
        recieverid:recieverId,
        text:text,
        images:imageUrl
        })
    await newMessage.save()
    // realtime functionality socket.io
    return res.status(200).json({message:newMessage});
    } catch (error) {
    console.log("Error in SendMessages Controller ",error.message)
    res.status(500).json({message:"Internal Server error"})
    }
}