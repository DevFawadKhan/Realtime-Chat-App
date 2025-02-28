import { useState } from "react";
import {MessageSquareIcon,Mail,LockIcon,Eye,EyeClosed} from 'lucide-react'
import {Link} from 'react-router-dom'
import  {useAuthStore} from'../store/useAuthStore.js' 
function LogInPage() {
  const [ShowPassword, setShowPassword] = useState(false)
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const {Login,isLoggingIn} =useAuthStore();

  //  Handle Submit  
  const HandleSubmit=(e)=>{
    e.preventDefault();
    console.log(email,password);
    Login(email,password)
  }
  return (
    <>
    <div className="bg-[#1C232A] h-screen w-full flex items-center justify-center">
    <div className='space-y-5'>
      <div className='text-purple-500 bg-[#252E44] p-1 w-fit rounded ml-12'><MessageSquareIcon /></div>
      <h1 className='text-white font-bold text-3xl '>Create Account</h1>
      <p className='font-serif text-white'>Get Started with your free Account</p>
      <form onSubmit={HandleSubmit}>
        {/* Mail Input */}
            <div className='space-y-3 relative'>
            <label className='block text-white font-serif'>Email</label>
            <input type="text" className='text-white w-full border border-white rounded-full pl-8 py-1' placeholder='Enter mail' value={email} onChange={(e)=>setemail(e.target.value)} />
            <div className='absolute text-white top-10 left-1'><Mail/></div>
            </div>
            {/* Password Input */}
            <div className='space-y-3 relative'>
            <label className='block text-white font-serif'>Password</label>
            <input type={ShowPassword?"text":"password"} value={password} onChange={(e)=>setpassword(e.target.value)} className='text-white w-full border border-white rounded-full pl-8 py-1' placeholder='oooooo'/>
            <div className="absolute top-10 left-1 text-white "><LockIcon></LockIcon></div>
          <div className='absolute text-white top-10 cursor-pointer right-2'>
          <button type="button"onClick={()=>setShowPassword(!ShowPassword)}>{ShowPassword?<Eye/>:<EyeClosed/>}</button></div>
          </div>
     <div className='flex justify-center mt-3 mb-2'>
     <button className='text-white bg-purple-600 hover:bg-purple-500 px-10 py-2 text-center  cursor-pointer font-medium rounded'>{isLoggingIn?"Submitting":"Submit"}</button>
      </div>
      <Link to="/signup">
      <p className='text-white text-center mt-3 font-serif'>Don&#39;t have and account?<span className='underline text-purple-500  px-1 cursor-pointer hover:text-purple-300'>Sign Up</span></p>
      </Link>
      </form>
    </div>
    </div>
    </>
  )
}

export default LogInPage
