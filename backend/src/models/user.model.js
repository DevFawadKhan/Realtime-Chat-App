import mongoose from "mongoose";
const UserSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
          type:String,
          required:true,
          unique:true,
        },
        password:{
          type:String,
          required:true,
          minlength:6,
        },
        ProfilePic:{
            type:String,
            default:true,
        }
    }
)

const User=mongoose.model("Users",UserSchema);
export default User