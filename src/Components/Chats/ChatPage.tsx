import React, { useState } from "react";
import { LuCircleDashed } from "react-icons/lu";
import chatData from "../../data/data";
import Chat from "./Chat";
import SearchBar from "./SearchBar";

const ChatPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  return (
    <div className="max-h-[calc(100vh)] overflow-y-hidden">
      <style>
        {`
          .chat-list::-webkit-scrollbar {
            width: 4px;
            cursor: pointer;
          }
          .chat-list::-webkit-scrollbar-track {
            background-color: rgba(229, 231, 235, var(--bg-opacity));
          }
          .chat-list::-webkit-scrollbar-thumb {
            background-color: #a0aec0;
          }
        `}
      </style>

      <div className="mt-[30px] flex justify-between items-center">
        <span className="font-semibold text-text text-[20px] mx-0.5">
          Chats
        </span>
        <div>
          <LuCircleDashed className="text-accent cursor-pointer" />
        </div>
      </div>

      <SearchBar />
      <div className=" mt-3 p-2 flex flex-col pr-3 gap-4 chat-list max-h-[90vh] overflow-y-auto">
        {chatData.map((chat) => (
          <Chat
            key={chat.id}
            id={chat.id}
            firstname={chat.firstname}
            lastname={chat.lastname}
            lastmessage={chat.lastmessage}
            lastTimeMessage={chat.lastTimeMessage}
            image={chat.image}
            isOnline={chat.isOnline}
            isSelected={selectedChat === chat.id}
            onClick={() => setSelectedChat(chat.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatPage;
