import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore.js";
import {Link} from 'react-router-dom'
import { MessageSquare,User,EyeIcon, Mail,Lock, EyeClosed} from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import toast from "react-hot-toast";
function SignUpPage() {
  const [ShowPassword, setShowPassword] = useState(false);
  const [FoamData, setFoamData] = useState({
    name:"",
    email:"",
    password:"",
  })
  console.log(FoamData.name)
  console.log(FoamData.email)
  console.log(FoamData.password)
const {signup}=useAuthStore();
const validateFoam = () => {
  let errors = []; // Errors store karne ke liye array
  if (!FoamData?.name) errors.push("Full name is required");
  if (!FoamData?.email) errors.push("Email is required");
  if (!FoamData?.password) errors.push("Password is required");
  if ((FoamData?.password ?? "").length < 6) errors.push("Password must be at least 6 characters");
  if (errors.length > 0) {
    errors.forEach(err => toast.error(err)); // Sabhi errors ek sath show karne ke liye
    return false; // Validation fail hua
  }
  return true; // Sab kuch sahi hai
};

const handleSubmit=(e)=>{
    e.preventDefault();
  console.log("Before Validation:",FoamData); 
    const success=validateFoam();
    if(success===true) signup(FoamData);
}
  return (
    <>
    <div className="grid grid-cols-2 gap-2 bg-[#1C232A] ">
      {/* left side */}
    <div className=" ">
      {/* Logo */}
      <div className="flex items-center justify-center h-screen flex-col">
      <MessageSquare className="text-[#5F67CE] bg-[#252E44] px-1 rounded-sm"/>
      <div className="text-white  p-5 text-center space-y-2">
      <h1 >Create Account</h1>
      <p>Get Started with your free Account</p>
      </div>
       {/* Foam */}
      <form onSubmit={handleSubmit}>
        {/* name input */}
      <div className="relative flex justify-center flex-col space-y-2">
      <label htmlFor="email" className="text-white ">Full Name</label>
      <User className="absolute left-1 mt-9 text-white"></User>
      <input type="text" value={FoamData.name} onChange={(e)=>setFoamData((prev)=>({...prev,name:e.target.value}))} className="w-full rounded-lg m-[2px_1px] text-white border border-gray-200 pl-7 p-1 pe-12 text-sm shadow-xs lg:w-[40vh]" placeholder="Jhon Doe" />
      </div>
      {/* email input */}
      <div className="relative flex justify-center flex-col space-y-2">
      <label htmlFor="email" className="text-white ">Email</label>
      <Mail className="absolute left-1 mt-9 text-white"></Mail>
      <input type="text" value={FoamData.email} onChange={(e)=>setFoamData((prev)=>({...prev,email:e.target.value}))}className="w-full rounded-lg m-[2px_1px] text-white border border-gray-200 pl-7 p-1 pe-12 text-sm shadow-xs lg:w-[40vh]" placeholder="Enter email" />
      </div>
      {/* password input */}
      <div className="relative flex justify-center flex-col space-y-2">
      <label htmlFor="email" className="text-white ">Password</label>
      <Lock className="absolute left-1 mt-9 text-white"></Lock>
      <input type={ShowPassword?"text":"password"} value={FoamData.password} onChange={(e)=>setFoamData((prev)=>({...prev,password:e.target.value}))} className="w-full rounded-lg m-[2px_1px] text-white border border-gray-200 pl-7 p-1 pe-12 text-sm shadow-xs lg:w-[40vh]" placeholder="ooooo" />
      <button type="button" className="absolute right-2 text-white mt-8 "onClick={()=>setShowPassword(!ShowPassword)}>
        {ShowPassword?(<EyeIcon/>):(<EyeClosed/>)}
      </button>
      </div>
      {/* Button */}
      <div className="my-3 flex justify-center text-white  bg-[#5F67CE] p-2 rounded-lg ml-3 md:ml-9 lg:ml-0 w-32 lg:w-full">
      <button className="cursor-pointer">Create Account</button>
      </div>
      </form>   
      {/* ALready account */}
      <div className="mt-5 whitespace-pre ">
       <h1 className="text-white text-wrap ml-1 p-[1px]">All ready have an account? <Link to="/login" className="underline text-[#5F67CE] cursor-pointer space-x-1">Signin</Link></h1>
      </div>
      </div>
    </div>
    {/*Right side  */}
    <AuthImagePattern title="Join our community" subtitle="Connect with friends,share moments,and stay in touch with you"/>
    </div>
    </>
  )
}

export default SignUpPage
