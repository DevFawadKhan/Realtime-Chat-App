// import React from 'react'
import SideBar from "../components/SideBar.jsx"
import NoChatSelected from "../components/NoChatSelected.jsx"
import ChatContainer from "../components/ChatContainer.jsx"
import { useChatStore } from "../store/useChatStore.js"
function HomePage() {
  const {selectedUser}=useChatStore()
  return (

    <>
    <div className="flex h-screen ">
      <div className="w-[60%]  md:w-1/2 lg:w-2/5 h-screen overflow-y-auto ">
      <SideBar></SideBar>
      </div>
       <div className="h-screen flex-grow ">
        {
        !selectedUser ?<NoChatSelected></NoChatSelected>:<ChatContainer></ChatContainer>
        }
       </div>
    </div>
    </>
  )
}

export default HomePage
