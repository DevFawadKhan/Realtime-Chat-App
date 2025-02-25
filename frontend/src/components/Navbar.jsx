import {MessageSquare,SettingsIcon,User,LucideDoorOpen} from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore.js'
import { Link } from 'react-router-dom';
function Navbar() {
  const {Logout,authUser}=useAuthStore();
  return (
    <>
    <header>
  <div className='w-full bg-[#1B2129] flex justify-between items-center p-2'>
  {/*  Left Side - Message Icon & Chatty */}
  <div className='flex items-center gap-1  p-2 lg:ml-14 md:ml-14'>
    <MessageSquare className='text-[#5F67CE] bg-[#252E44] p-1 rounded' />
    <span className='text-[15px] font-bold text-white '>Chatty</span>
  </div>
  {/*  Right Side - Profile, Logout, Settings */}
  <div className='flex items-center gap-1 lg:gap-5 md:gap-4 mr-5 lg:mr-10 text-white cursor-pointer'>
    {/*Navigate on setting page*/}
    <Link to="/setting">
    <div className='flex items-center gap-1  p-1 bg-[#181C22] rounded'>
      <SettingsIcon />
      <span className='hidden lg:block md:block'>Setting</span>
    </div>
    </Link>
    {/* conditional redering on profile and logout when exist user that show these component*/}
    {
     authUser&&
     <Link to='/profile'>
      <div className='flex items-center gap-1 p-1 bg-[#181C22] rounded'>
     <User />
     <span className='hidden lg:block md:block'>Profile</span>
   </div>
     </Link>
    }
    {
    authUser&& <div onClick={Logout} className='flex items-center gap-1 p-1 bg-[#181C22] rounded'>
      <LucideDoorOpen />
      <span className='hidden lg:block md:block'>Logout</span>
    </div>
    }
  </div>
</div>
    </header>
    </>
  )
}

export default Navbar
