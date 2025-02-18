import mongoose from "mongoose";

const messageSchema= new mongoose.Schema({
    senderid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true,
    },
    recieverid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true,
    },
    text:{
        type:String,
    },
    images:{
        type:String,
    }
},{timestamps:true});

 const Message=mongoose.model("Message",messageSchema);
export default Message;
