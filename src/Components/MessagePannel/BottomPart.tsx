import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import { GoSmiley } from "react-icons/go";
import { IoIosLink } from "react-icons/io";
import * as signalR from "@microsoft/signalr";

interface BottomPartProps {
  roomId: string;
  connection: signalR.HubConnection | null;
}

const BottomPart: React.FC<BottomPartProps> = ({ roomId, connection }) => {
  const [message, setMessage] = useState<string>("");

  const sendMessage = async () => {
    if (connection && message.trim()) {
      try {
        await connection.invoke("SendMessage", roomId, message);
        setMessage("");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div
      className="bg-[#EAF2FE] h-full w-full items-center flex justify-center
    border-t-2 border-[#D0E3FF]"
    >
      <div className="w-full mx-8">
        <div className="flex gap-3 mx-3 items-center">
          <div className="relative w-full">
            <input
              type="text"
              className="w-full p-3 pl-10 outline-none rounded-lg placeholder:text-black placeholder:font-semibold"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="Write a message ..."
            />
            <IoIosLink className="absolute left-0 top-1/2 transform -translate-y-1/2 mx-3 cursor-pointer size-5" />
            <GoSmiley className="absolute right-0 top-1/2 transform -translate-y-1/2 mx-3 cursor-pointer size-5" />
          </div>
          <button 
            className="bg-card-primary p-2 rounded-xl size-12  flex items-center justify-center hover:bg-card-primary/85 transition-colors"
            onClick={sendMessage}
          >
            <BsSend className="text-white size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomPart;