import { Users2Icon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect,useState} from "react";
import CardSkaleton from "./CardSkaleton";
import Avatar from '../assets/Avatar.png'
import { useAuthStore } from "../store/useAuthStore";
function SideBar() {
  const {users,isUserLoading,GetUsers,SetSlectedUser,selectedUser}=useChatStore();
  const [ShowOnlineOnly, setShowOnlineOnly] = useState(false)
   const{OnlineUsers}=useAuthStore()
  useEffect(()=>{
    GetUsers()
  },[GetUsers])
  console.log(users);
  // filterusered for show online only
  const FilteredUsers=ShowOnlineOnly ? users.filter(user=>OnlineUsers.includes(user._id)):users;
  return (
    <aside className="bg-white h-screen  ">
      <div className="sticky top-0 h-24 z-50 bg-white shadow-lg ">
        {/* this div sticky */}
      <div className="pl-4 pt-4 flex gap-1">
        <Users2Icon className="text-[#AF7E48]" />
        <h3 className="font-bold text-[#AF7E48]">Contacts</h3>
      </div>
        {/* Check box */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input type="checkbox" checked={ShowOnlineOnly}
            onChange={(e)=>setShowOnlineOnly(e.target.checked)} className="mt-2 ml-3"/>
            <span>show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({OnlineUsers.length-1}Online)</span>
        </div>
      </div>
      <div className="h-screen ">
        {isUserLoading?<CardSkaleton/>:FilteredUsers.map((value) => (
   <div 
  key={value._id} 
  onClick={() => SetSlectedUser(value)} 
  className={`cursor-pointer mt-5 px-2 sm:px-4 md:px-6 flex items-center justify-start h-[60px] sm:h-[70px] md:h-[75px] transition-all duration-300 
    ${selectedUser?._id === value._id ? "bg-gray-300" : ""}`}
>
  <div className="relative z-0">
    <img 
      className="w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] md:w-[60px] md:h-[60px] rounded-full" 
      src={value?.ProfilePic ? value?.ProfilePic : Avatar || null} 
      onError={(e) => { 
        console.log('Image load failed:', e.target.src); 
        e.target.src = Avatar;
      }} 
      alt="profile" 
    />
    {OnlineUsers?.includes(value?._id) && (
      <span className="absolute bottom-0 right-2 size-2 sm:size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"></span>
    )}
  </div>
  <div className="ml-2 sm:ml-3 flex flex-col">
    <h1 className="font-bold text-sm sm:text-base">{value?.name}</h1>
    <p className="text-xs sm:text-sm">offline</p>
  </div>
</div>
  ))}
  {FilteredUsers.length===0&&(
    <div className="text-center py-5 text-zinc-500">No online users</div>
  )}
</div>
    </aside>
  );
}

export default SideBar;
