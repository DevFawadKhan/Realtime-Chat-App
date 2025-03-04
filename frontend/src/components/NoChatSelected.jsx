import { MessageSquareIcon } from "lucide-react";

function NoChatSelected() {
  return (
    <div className="bg-[#1E151E] h-full flex flex-col justify-center items-center">
      <MessageSquareIcon className="text-[#AF7E48] bg-[#342423] rounded p-1 h-[40px] w-[40px]" />

      <div className="text-center mt-4">
        <h1 className="text-[#AF7E48] text-[30px] font-bold">Welcome to Chatty!</h1>
        <p className="text-[#AF7E48]">Select a conversation from the sidebar to start chatting</p>
      </div>
    </div>
  );
}

export default NoChatSelected;
