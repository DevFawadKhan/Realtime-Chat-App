// import { useAuthStore } from "../store/useAuthStore"
import Avatar from '../assets/Avatar.png';
import {CameraIcon,User,Mail} from 'lucide-react'
function ProfilePage() {
    // const {UploadProfile,authUser}=useAuthStore
  return (
    <>
<div className="bg-[#1C232A] h-screen  flex flex-col items-center justify-start">
  <div className="bg-[#14181E] w-[50%] mt-5 p-4 text-center text-white rounded-2xl">
    <h1 className="font-bold text-2xl my-2">Profile</h1>
    <p className='font-serif'>Your profile information</p>
    <div className=' relative  flex justify-center '>
    <img className= 'h-[150px]' src={Avatar} alt="" />
    <CameraIcon  className='text-white absolute bg-gray-600 p-1 rounded bottom-4 '></CameraIcon>
    </div>
    <p className='font-serif'>Click the camera icon to update your photo</p>
      {/* input  name read only */}
    <div className='flex mt-5 gap-1 lg:ml-20'>
   <User className='text-white'></User>
   <h1 className=' font-serif'>Full name</h1>
  </div>
  <input className='bg-transparent focus:outline-none w-full border border-gray-600 rounded pl-4  mt-2 lg:w-[80%]' value="Jhon Doe" readOnly/>
  {/* input  email read only */}
  <div className='flex mt-5 gap-1 lg:ml-20'>
   <Mail className='text-white'></Mail>
   <h1 className=' font-serif'>Mail</h1>
  </div>
  <input className='bg-transparent w-full border focus:outline-none border-gray-600 rounded pl-4  mt-2 lg:w-[80%]' value="Jhon@gmail.com" readOnly/>
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
