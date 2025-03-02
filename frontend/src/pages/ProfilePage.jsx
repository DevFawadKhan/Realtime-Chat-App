import { useRef,useState } from "react";
import { useAuthStore } from "../store/useAuthStore"
import Avatar from '../assets/Avatar.png';
import {CameraIcon,User,Mail} from 'lucide-react'
function ProfilePage() {
    const {UploadProfile,authUser,isUpdatingProfile}=useAuthStore();
    const [selectedimg, setselectedimg] = useState(null)
    const fileInputRef=useRef(null); 
    const HandleCameraClick=()=>{
      fileInputRef.current.click(); //input file ko click karne par trigger hoga.
    }
    // HandleImageUpload
    const  HandleImageUpload=async (e)=>{
      const  file=e.target.files[0];
      if(!file) return;
      const reader=new FileReader(); //FileReader ek built-in JavaScript API hai jo files ko read karta hai.
      reader.readAsDataURL(file);
      reader.onload=async()=>{
        const base64image=reader.result;
        setselectedimg(base64image)
        await UploadProfile({profilepic:base64image});
      }
    }
  return (
    <>
<div className="bg-[#1C232A] h-screen  flex flex-col items-center justify-start">
  <div className="bg-[#14181E] w-[50%] mt-5 p-4 text-center text-white rounded-2xl">
    <h1 className="font-bold text-2xl my-2">Profile</h1>
    <p className='font-serif'>Your profile information</p>
    <div className=' relative  flex justify-center '>
    <img className={`${selectedimg||authUser?.ProfilePic?"w-[90px] h-[80px] rounded-full border border-white":"h-[150px] border border-white rounded-full"}`} src={selectedimg||authUser?.ProfilePic||Avatar} alt="Dp" />
    <CameraIcon onClick={HandleCameraClick}className='text-white cursor-pointer absolute bg-gray-600 p-1 z-10 rounded bottom-1 border border-white'/>
    <input type="file" ref={fileInputRef} accept="image/*" onChange={HandleImageUpload}  className="absolute bottom-4 hidden"/>
    </div>
    <p className='font-serif'>{isUpdatingProfile?"Loading...":"Click the camera icon to update your photo"}</p>
      {/* input  name read only */}
    <div className='flex mt-5 gap-1 lg:ml-20'>
   <User className='text-white'></User>
   <h1 className=' font-serif'>Full name</h1>
  </div>
  <input className='bg-transparent focus:outline-none w-full border border-gray-600 rounded pl-4  mt-2 lg:w-[80%]' value={authUser?.name} readOnly/>
  {/* input  email read only */}
  <div className='flex mt-5 gap-1 lg:ml-20'>
   <Mail className='text-white'></Mail>
   <h1 className=' font-serif'>Mail</h1>
  </div>
  <input className='bg-transparent w-full border focus:outline-none border-gray-600 rounded pl-1 lg:pl-4  mt-2 lg:w-[80%]' value={authUser?.email} readOnly/>
  {/* Account Imformation */}
  <div className='flex justify-items-start mt-7 lg:ml-8'>
  <div><h1 className='font-serif'>Account information</h1></div>
  </div>
  {/* Member */}
  <div className='m-0 mb-2 lg:ml-8 flex justify-between'>
    <h5>Member since</h5>
    <p>2024-09-01</p>
  </div>
  <hr className="border border-gray-400" />
  {/* Status */}
  <div className='mt-2 mb-2 lg:ml-8 flex justify-between'>
    <h5>Status</h5>
    <p className='text-green-800'>Active</p>
  </div>
  <hr className="border border-gray-400" />
  </div>
</div>


    </>
  )
}

export default ProfilePage
