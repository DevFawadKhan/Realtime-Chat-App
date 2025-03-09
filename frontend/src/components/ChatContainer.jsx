// import React from 'react'
import { useEffect,useRef } from "react";
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import MessageSkaleton from "./MessageSkaleton.jsx";
import   {useAuthStore} from '../store/useAuthStore.js'
import Avatar from "../assets/Avatar.png"
function ChatContainer() {
  const {isMessagesLoading,GetMessages,selectedUser,messages,SubcribeToMessages,unSubcribeToMessage}=useChatStore();
     const {authUser}=useAuthStore()
  useEffect(()=>{
  // Calling function show all messages based on user-id.
  console.log("call used effect");
   GetMessages(selectedUser?._id);
  //  Subcribe to Messages
   SubcribeToMessages
   return()=>unSubcribeToMessage
  },[selectedUser?._id,SubcribeToMessages,unSubcribeToMessage])
// 
const messageEndRef = useRef(null);
// New message par auto scroll karne ke liye
useEffect(() => {
  messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);
  if(isMessagesLoading) return (
    <div className="flex flex-1  flex-col overflow-auto">
    <ChatHeader/>
    <MessageSkaleton/>
    <MessageInput/>
    </div>
  )
  return (
    <>
<div className="flex-1 flex flex-col">
  <ChatHeader />
  
  {/* Message Container */}
  <div className="flex-1 h-[calc(100vh-150px)] overflow-y-auto p-4 space-y-2 pb-[60px]">
    {messages.map((message) => (
      <div 
        key={message?._id}
        className={`flex items-start ${
          message?.senderid === authUser?._id ? 'justify-end' : 'justify-start'
        }`}
      >
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <img
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border"
            src={
              message.senderid === authUser._id 
                ? (authUser?.ProfilePic || Avatar) 
                : (selectedUser?.ProfilePic || Avatar)
            }
            alt="Profile"
            onError={(e) => (e.target.src = Avatar)}
          />
        </div>

        {/* Message Body */}
        <div
          className={`ml-2 p-2 rounded-lg text-white ${
            message?.senderid === authUser?._id
              ? 'bg-blue-500'
              : 'bg-gray-300 text-black'
          }`}
          style={{
            maxWidth: '75%',
            wordBreak: 'break-word'
          }}
        >
          <div className="flex flex-col">
            {/* Image Show */}
            {message.images && (
              <img
                src={message?.images}
                alt="Sent"
                className="rounded-md w-full max-w-[200px] sm:max-w-[250px] mb-1 object-contain"
              />
            )}
            {/* Text Show */}
            {message?.text && (
              <p className="text-sm leading-snug">{message?.text}</p>
            )}
          </div>
          <time className="block text-xs opacity-50 mt-1">
            {message?.createdAt 
              ? new Date(message?.createdAt).toLocaleTimeString() 
              : '...'}
          </time>
        </div>
      </div>
    ))}
    {/* Ref for scrolling */}
    <div ref={messageEndRef} />
  </div>

  {/* Fixed Input */}
  <div className="fixed bottom-0 left-0 w-full bg-white p-3 border-t">
    <MessageInput />
  </div>
</div>

    </>
  )
}

export default ChatContainer