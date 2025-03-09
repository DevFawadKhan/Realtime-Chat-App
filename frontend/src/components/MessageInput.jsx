import { useState,useRef } from "react"
import {X,Image,Send} from 'lucide-react'
import toast from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";
function MessageInput() {
    const [text, settext] = useState("")
    const [previmg, setprevimg] = useState(null)
    const fileinputRef=useRef(null);
    const {SendMessage}=useChatStore();
    const handleImageChange=(e)=>{
     const file=e.target.files[0];
     if(!file.type.startsWith("image/")){
        toast.error("Please select an image file");
        return;
     }
     const reader=new FileReader();
     reader.readAsDataURL(file);
     reader.onload=()=>{
      const base64image=reader.result;
        setprevimg(base64image);
     }
    }
    const RemoveImage=()=>{
    setprevimg(null);
    if(fileinputRef.current) fileinputRef.current.value=""
    }
    const HandleSubmit=async(e)=>{
      e.preventDefault();
        if(!text&&!previmg) return
        try {
          await SendMessage(text,previmg)
          // clean input fields after send message
          settext("")
          setprevimg(null);

          if(fileinputRef.current) fileinputRef.current.value=""
        } catch (error) {
          console.error("Failed to send message",error);
        }
    }
  return (
   <>
 <div className="w-full p-4 bg-blue-600 fixed bottom-0 left-0 z-10">
  {previmg && (
    <div className="mb-3 flex items-center gap-2">
      <div className="relative">
        <img
          src={previmg}
          alt="Preview"
          className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
        />
        <button
          onClick={RemoveImage}
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center bg-red-500"
        >
          <X className="size-3" />
        </button>
      </div>
    </div>
  )}

  {/* Form */}
  <form onSubmit={HandleSubmit} className="flex items-center gap-2">
    <div className="flex-1 flex gap-2">
      {/* Text message */}
      <input
        type="text"
        placeholder="Type a message"
        className="w-full pl-4 border-2 border-gray-300 focus:border-blue-500 outline-none rounded-lg bg-white"
        value={text}
        onChange={(e) => settext(e.target.value)}
      />
      {/* File upload */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileinputRef}
        onChange={handleImageChange}
      />
      {/* Image icon */}
      <button
        type="button"
        className={`hidden sm:flex btn btn-circle ${
          previmg ? "text-green-500" : "text-gray-400"
        }`}
        onClick={() => fileinputRef.current?.click()}
      >
        <Image size={20} />
      </button>
    </div>
    {/* Send button */}
    <button
      type="submit"
      className={`px-4 py-2 rounded-md ${
        text || previmg
          ? "cursor-pointer text-white bg-green-500"
          : "cursor-not-allowed bg-gray-400"
      }`}
      disabled={!text && !previmg}
    >
      <Send size={22} />
    </button>
  </form>
</div>

   </>
  )
}
export default MessageInput