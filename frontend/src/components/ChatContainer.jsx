// import React from 'react'
import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import MessageSkaleton from "./MessageSkaleton.jsx";
import   {useAuthStore} from '../store/useAuthStore.js'
import Avatar from "../assets/Avatar.png"
function ChatContainer() {
  const {isMessagesLoading,GetMessages,selectedUser,messages}=useChatStore();
     const {authUser}=useAuthStore()
  useEffect(()=>{
  // Calling function show all messages based on user-id.
  console.log("call used effect");
   GetMessages(selectedUser?._id);
  },[GetMessages,selectedUser?._id])

  if(isMessagesLoading) return (
    <div className="flex flex-1  flex-col overflow-auto">
    <ChatHeader/>
    <MessageSkaleton/>
    <MessageInput/>
    </div>
  )
  return (
    <>
    <div className=" h-screen flex-1 flex  flex-col overflow-auto">
    <ChatHeader/>
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
  {messages.map((message) => (
    <div
      key={message?._id}
      className={`flex items-center ${message?.senderid === authUser?._id ? 'justify-end' : 'justify-start'}`}
    >
      {/* Profile Picture */}
      <div className="flex items-center">
        <img
          className="size-8 rounded-full border"
          src={message.senderid === authUser._id ?(authUser?.ProfilePic?authUser?.ProfilePic:Avatar ):(selectedUser?.ProfilePic?selectedUser?.ProfilePic:Avatar)}
          alt="Profile"
          onError={(e) => (e.target.src = Avatar)}
        />
      </div>
      {/* Message Body */}
      <div
  className={`ml-2 max-w-[70%] p-2 rounded-lg text-white ${
    message?.senderid === authUser?._id
      ? 'bg-blue-500'
      : 'bg-gray-300 text-black'
  }`}
>
  {/* Text Show */}
  {message?.text && (
    <p className="text-sm">{message?.text}</p>
  )}
  {/* Image Show */}
  {/* {message?.images && (
  <div className="mt-2 inline-block w-[20%]">
    <img
      src={message?.images}
      alt="Sent"
      className="rounded-lg max-w-[20%] h-auto object-contain"
    />
  </div>
)} */}

  {/* Time Show */}
  <time className="block text-xs opacity-50 mt-1">
    {new Date(message?.createdAt).toLocaleTimeString()}
  </time>
</div>

    </div>
  ))}
</div>
    <MessageInput/>
    </div>
    </>
  )
}

export default ChatContainer