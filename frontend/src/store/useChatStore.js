import {create} from 'zustand'
import toast from 'react-hot-toast'
import {axiosInstance} from '../lib/axios.js'


export const useChatStore=create((set)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false,
    
    // Call Api get ALL user Saved in db.
    GetUsers:async()=>{
     set({isUserLoading:true});
     try {
        const res=await axiosInstance.get("/messages/users");
        set({users:res.data});
     } catch (error) {
        toast.error(error.response.data.message);
     }finally{
        set({isUserLoading:false});
     }
    },
    // Get Messages all but specific user-id.
    GetMessages:async (UserId)=>{
        set({isMessagesLoading:true});
        try{
        const res=await axiosInstance.get(`/message/${UserId}`);
        set({messages:res.data});
        } catch (error) {
        toast.error(error.response.data.message);
        } finally{
        set({isMessagesLoading:false});
        }
    },
    // Selected user 
    SetSlectedUser:(selectedUser)=>set({selectedUser})
}))