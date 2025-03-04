import { Users2Icon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect} from "react";
import CardSkaleton from "./CardSkaleton";
import Avatar from '../assets/Avatar.png'
function SideBar() {
  const {users,isUserLoading,GetUsers,SetSlectedUser,selectedUser}=useChatStore();

  //   { id: 1, name: "Jane Doe", status: "Offline", image: "https://images.pexels.com/photos/30913847/pexels-photo-30913847/free-photo-of-indoor-artistic-scene-with-calligraphy-and-cat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  //   { id: 2, name: "John Smith", status: "Online", image: "https://images.pexels.com/photos/30913847/pexels-photo-30913847/free-photo-of-indoor-artistic-scene-with-calligraphy-and-cat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  //   { id: 3, name: "John Smith", status: "Online", image: "https://images.pexels.com/photos/30913847/pexels-photo-30913847/free-photo-of-indoor-artistic-scene-with-calligraphy-and-cat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  //   { id: 4, name: "John Smith", status: "Online", image: "https://images.pexels.com/photos/30913847/pexels-photo-30913847/free-photo-of-indoor-artistic-scene-with-calligraphy-and-cat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  //       { id: 5, name: "John Smith", status: "Online", image: "https://images.pexels.com/photos/30913847/pexels-photo-30913847/free-photo-of-indoor-artistic-scene-with-calligraphy-and-cat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },   
  //        { id: 6, name: "John Smith", status: "Online", image: "https://images.pexels.com/photos/30913847/pexels-photo-30913847/free-photo-of-indoor-artistic-scene-with-calligraphy-and-cat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },   
  //         { id: 7, name: "John Smith", status: "Online", image: "https://images.pexels.com/photos/30913847/pexels-photo-30913847/free-photo-of-indoor-artistic-scene-with-calligraphy-and-cat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },  
  //           { id: 8, name: "John Smith", status: "Online", image: "https://images.pexels.com/photos/30913847/pexels-photo-30913847/free-photo-of-indoor-artistic-scene-with-calligraphy-and-cat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  //            },
  //            { id: 9, name: "John Smith", status: "Online", image: "https://images.pexels.com/photos/30913847/pexels-photo-30913847/free-photo-of-indoor-artistic-scene-with-calligraphy-and-cat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  //            { id: 10, name: "John Smith", status: "Online", image: "https://images.pexels.com/photos/30913847/pexels-photo-30913847/free-photo-of-indoor-artistic-scene-with-calligraphy-and-cat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  //            { id: 11, name: "John Smith", status: "Online", image: "https://images.pexels.com/photos/30913847/pexels-photo-30913847/free-photo-of-indoor-artistic-scene-with-calligraphy-and-cat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  //            { id: 12, name: "John Smith", status: "Online", image: "https://images.pexels.com/photos/30913847/pexels-photo-30913847/free-photo-of-indoor-artistic-scene-with-calligraphy-and-cat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  // ];
  useEffect(()=>{
    GetUsers()
  },[GetUsers])
  console.log(users);
  return (
    <aside className="bg-white h-screen  ">
      <div className="sticky top-0 h-24 bg-white shadow-lg ">
        {/* this div sticky */}
      <div className="pl-4 pt-4 flex gap-1">
        <Users2Icon className="text-[#AF7E48]" />
        <h3 className="font-bold text-[#AF7E48]">Contacts</h3>
      </div>
        {/* Check box */}
        <div className=" pl-4 pt-4 flex gap-1 items-center">
        <input  type="checkbox" />
        <p className="text-[#AF7E48] ">Show online only <span className="text-black hidden md:inline-block lg:inline-block ">(0 online)</span></p>
      </div>
      </div>
      <div className="h-screen ">
        {isUserLoading?<CardSkaleton/>:users.map((value) => (
     <div 
     key={value._id} 
     onClick={() => SetSlectedUser(value)} 
     className={`cursor-pointer mt-5 pl-2 flex items-center h-[75px] transition-all duration-300 
       ${selectedUser?._id === value._id ?"bg-gray-300":""}`}
   >
     <img className="w-[60px] h-[60px] rounded-full" src={value.ProfilePic || Avatar} alt="" />
     <div className="ml-3 flex flex-col">
       <h1 className="font-bold">{value?.name}</h1>
       <p>offline</p>
       {console.log(selectedUser)}
     </div>
   </div>
  ))}
</div>
    </aside>
  );
}

export default SideBar;
