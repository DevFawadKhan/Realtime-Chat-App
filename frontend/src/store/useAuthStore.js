import {create} from 'zustand'
import { axiosInstance } from '../lib/axios.js'
export const useAuthStore=create((set)=>({
    authUser:null, // Initially user logged in nahi ha initial state.
    isSignUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,

    isCheckingAuth:true,
    // function for check user is authentic for not call api
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
     signup:async(data)=>{

     }
}))
