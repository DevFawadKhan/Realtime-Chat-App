import { useChatStore } from "../store/useChatStore"
import {X} from 'lucide-react'
function ChatHeader() {
  const {selectedUser,SetSlectedUser}=useChatStore();
  return (
    <>
    <header className="bg-white">
      <div className="relative flex gap-3 mt-3">
      <img className="w-[60px] h-[60px] rounded-full ml-3 mb-2" src={selectedUser.ProfilePic} alt="dp" />
      <div className="flex flex-col">
      <h1 className="text-black font-bold">{selectedUser.name}</h1>
      <p className="text-black">Online</p>
       </div>
       <button onClick={()=>SetSlectedUser(null)} className="absolute cursor-pointer right-3 top-3"><X/></button>
      </div>
    </header>
    </>
  )
}
export default ChatHeader