import React from "react";

interface ChatProps {
  firstname: string;
  lastname: string;
  lastmessage: string;
  lastTimeMessage: string;
  image: string;
  // onclick: () => void;
}

const Chat: React.FC<ChatProps> = ({
  firstname,
  lastname,
  lastmessage,
  lastTimeMessage,
  image,
}) => {
  return (
    <div className="flex items-start justify-between bg-background-leger text-black p-3 rounded-xl cursor-pointer">
      <div className="flex items-center">
        <img
          src={image}
          alt="User"
          className="w-12 h-12 object-cover rounded-full mr-3"
        />
        <div>
          <div className="font-semibold">
            {firstname} {lastname}
          </div>
          <p className="text-[#7C7C7D]">{lastmessage}</p>
        </div>
      </div>
      <div className="text-right text-xs">
        <p>{lastTimeMessage}</p>
      </div>
    </div>
  );
};

export default Chat;
