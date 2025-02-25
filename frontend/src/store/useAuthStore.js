import {create} from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast';
export const useAuthStore=create((set)=>({
    authUser:null, // Initially user logged in nahi ha initial state.
    // isSignUp:false,
    // isLoggingIn:false,
    isUpdatingProfile:false,

    isCheckingAuth:true,
    // function for check user is authentic or not call api
     checkAuth:async()=>{
        try {
        const res=await axiosInstance.get("/auth/check")
        set({authUser:res.data});
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
     try {
        const res=await axiosInstance.post("/auth/signup",{
          name:name,
          email:email,
          password:password,
        })
        toast.success("Account Created Successfully");
        console.log(res.data);
        set({authUser:res.data});
     } catch (error) {
        console.log("Error is Signup response",error);
        toast.error(error.response.data.message);
     }
     },
    //  Logout Api call
     Logout:async()=>{
       try {
        const res=await axiosInstance.post('/auth/logout');
        toast.success("Logout sucessfully");
       set({authUser:null});
       console.log(res.data);
       } catch (error) {
        console.log("Error is Logout response",error);
        toast.error(error.response.data.message);
       }
     }
}))
