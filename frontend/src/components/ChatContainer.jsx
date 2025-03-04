// import React from 'react'
import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import MessageSkaleton from "./MessageSkaleton.jsx";
function ChatContainer() {
  const {isMessagesLoading,GetMessages,selectedUser}=useChatStore();

  useEffect(()=>{
  // Calling function show all messages based on user-id.
  GetMessages(selectedUser._id);
  },[GetMessages,selectedUser._id])

  if(isMessagesLoading) return (
    <div className="flex flex-1  flex-col overflow-auto">
    <ChatHeader/>
    <MessageSkaleton/>
    <MessageInput/>
    </div>
  )
  return (
    <>
    <div className="bg-black h-screen flex-1 flex  flex-col overflow-auto">
    <ChatHeader/>
    <p className="text-white">Messages...</p>
    <MessageInput/>
    </div>
    </>
  )
}

export default ChatContainer