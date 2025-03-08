import Navbar from "./components/Navbar.jsx"
import {Routes,Route, Navigate} from 'react-router-dom'
import HomePage from "./pages/HomePage.jsx"
import SignUpPage from './pages/SignUpPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SettingPage from './pages/SettingPage.jsx'
import LogInPage  from './pages/LogInPage.jsx'
import { useAuthStore } from "./store/useAuthStore.js"
import { useEffect } from "react"
import {Loader} from 'lucide-react'
import {Toaster} from 'react-hot-toast'
import CardSkaleton from "./components/CardSkaleton.jsx"
function App() {
const {authUser,checkAuth,isCheckingAuth} =useAuthStore();
useEffect(()=>{
checkAuth();
},[checkAuth])

console.log({authUser});
if(isCheckingAuth&&!authUser){
  return(
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
  )
}
  return (
    <>
    <div data-theme="cupcake">
    <Navbar/>
<Routes>
  <Route path="/" element={authUser?<HomePage/>:<Navigate to="/login"/>}/>
  <Route path="/login" element={!authUser?<LogInPage/>:<Navigate to="/"/>}/>
  <Route path="/signup" element={!authUser?<SignUpPage/>:<Navigate to="/"/>}/>
  <Route path="/setting" element={<SettingPage/>}/>
  <Route path="/profile" element={authUser?<ProfilePage/>:<Navigate to="/login"/>}/>
  <Route path="/skaleton" element={<CardSkaleton></CardSkaleton>}/>
   
</Routes>
<Toaster></Toaster>
    </div>
    </>
  )
}
//Is code me !authuser ka matlab hai agar authuser nahi hai (null, undefined, false) toh access deny kar do.
export default App