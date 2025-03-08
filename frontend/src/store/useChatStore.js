import {create} from 'zustand'
import toast from 'react-hot-toast'
import {axiosInstance} from '../lib/axios.js'

export const useChatStore=create((set,get)=>({
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
        console.log("this is res",res.data);
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
        const res=await axiosInstance.get(`/messages/${UserId}`);
        console.log("respone",res.data);
      set({messages:res.data});
      //   console.log("this is message",messages)
        } catch (error) {
        toast.error(error.response.data);
        } finally{
        set({isMessagesLoading:false});
        }
    },
   //  Send Message save db call api 
   SendMessage:async(text,image)=>{
     const {selectedUser,messages} = get();
     try {
      const res=axiosInstance.post(`/messages/send/${selectedUser._id}`,{
         text:text,
         image:image
      });
      set({messages:[...messages,(await res).data]});
      toast.success(`Send Message`);
     } catch (error) {
      toast.error("",error.response.data.message);
     }
   },
    // Selected user 
    SetSlectedUser:(selectedUser)=>set({selectedUser})
}))