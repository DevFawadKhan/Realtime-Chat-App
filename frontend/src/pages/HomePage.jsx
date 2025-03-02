// import React from 'react'
import SideBar from "../components/SideBar.jsx"
import NoChatSelected from "../components/NoChatSelected.jsx"
function HomePage() {
  return (
    <>
    <div className="flex h-screen ">
      <div className="w-full  md:w-1/2 lg:w-2/5 h-screen overflow-y-auto ">
      <SideBar></SideBar>
      </div>
       <div className="h-screen flex-grow ">
        <NoChatSelected></NoChatSelected>
       </div>
    </div>
    </>
  )
}

export default HomePage
