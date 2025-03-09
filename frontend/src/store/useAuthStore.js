import {create} from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast';
import {io} from 'socket.io-client'
const BASE_URL="http://localhost:3000";
export const useAuthStore=create((set,get)=>({
    authUser:null, // Initially user logged in nahi ha initial state.
    isSignUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    socket:null,
    OnlineUsers:[],
    // function for check user is authentic or not call api
     checkAuth:async()=>{
        try {
        const res=await axiosInstance.get("/auth/check")
        set({authUser:res.data});
        get().ConnectSocket()
        } catch (error) {
            console.log("Error in checkingAuth",error);
            set({authUser:null});
        }
        finally{
            set({isCheckingAuth:false});
        }
     },

    //  Signup Api call
     signup:async(data)=>{
      const  {name,email,password}=data
      set({isSignUp:true})
     try {
         const res=await axiosInstance.post("/auth/signup",{
         name:name,
         email:email,
         password:password,
      })
      toast.success("Account Created Successfully");
      console.log(res.data);
        set({authUser:res.data});
        get().ConnectSocket()
     } catch (error) {
      console.log("Error is Signup response",error);
      toast.error(error.response.data.message);
     }finally{
      set({isSignUp:false})
     }
     },
    //  Logout Api call
     Logout:async()=>{
       try {
        const res=await axiosInstance.post('/auth/logout');
        toast.success("Logout sucessfully");
       set({authUser:null});
       get().DisConnectSocket();
       console.log(res.data);
       } catch (error) {
        console.log("Error is Logout response",error);
        toast.error(error.response.data.message);
       }
     },
   //   Upload profile
   UploadProfile:async(data)=>{
      set({isUpdatingProfile:true})
      try {
         const res=await axiosInstance.put("/auth/updateprofile",data)
         toast.success("Profile Upload sucessfully");
         set({authUser:res.data});
      } catch (error) {
       console.log("Error is UploadProfile response",error);
        toast.error(error.response.data.message);
      }finally{
         set({isUpdatingProfile:false})
      }
   },
   // Login Api call 
   Login:async(email,password)=>{
      set({isLoggingIn:true})
   try {
      const res=await axiosInstance.post("/auth/login",{
         email:email,
         password:password,
      })
      console.log(res);
      toast.success("Login successfull!");
      set({authUser:res.data});
      get().ConnectSocket()
   } catch (error) {
      console.log("Error is LogIn response",error);
      toast.error(error.response.data.message);
   }finally{
      set({isLoggingIn:false});
   }
   },

   // Method of socket realtime chatting
   ConnectSocket:()=>{
      const {authUser}=get()
      if(!authUser||get().socket?.connected) return
      const socket = io(BASE_URL, {
         withCredentials: true,
         query:{
            userId:authUser._id,
         }
       });       
      socket.connect()
      set({socket:socket})
      console.log("socket",socket);
      socket.on("getonlineUsers",(userId)=>{
         console.log(userId);
         set({OnlineUsers:userId})
      })
       socket.on("connect_error", (err) => {
         console.error("Socket connection error:", err);
       });
   },
   DisConnectSocket:()=>{
   if(get().socket?.connected) get.socket.disconnect();
   },
}))
