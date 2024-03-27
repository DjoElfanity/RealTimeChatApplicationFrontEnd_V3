import React from "react";

interface ChatProps {
  id: number;
  firstname: string;
  lastname: string;
  lastmessage: string;
  lastTimeMessage: string;
  image: string;
  isSelected: boolean;
  onClick: () => void;
  isOnline?: boolean;
}

const MAX_MESSAGE_LENGTH = 16;

const Chat: React.FC<ChatProps> = ({
  firstname,
  lastname,
  lastmessage,
  lastTimeMessage,
  image,
  isSelected,
  onClick,
  isOnline,
}) => {
  const shortenMessage = (message: string): string => {
    if (message.length > MAX_MESSAGE_LENGTH) {
      return `${message.substring(0, MAX_MESSAGE_LENGTH)}...`;
    }
    return message;
  };
  return (
    <div
      onClick={onClick}
      className={`transition duration-400 ease-in-out flex items-start  hover:text-white hover:bg-card-primary justify-between bg-background-leger p-3 rounded-xl cursor-pointer ${
        isSelected ? "text-white bg-card-primary" : "text-black"
      }`}
    >
      <div className="flex items-center relative">
        <img
          src={image}
          alt="User"
          className="w-12 h-12 object-cover rounded-full mr-3"
        />
        <div
          className={`${
            isOnline ? "bg-green-500" : "bg-red-500"
          } p-1.5 bottom-0 left-8 rounded-full absolute`}
        ></div>

        <div>
          <div className="font-semibold">
            {firstname} {lastname}
          </div>

          <p
            className={`hover${
              isSelected ? "text-white " : "text-[#7C7C7D] hover:text-white"
            }`}
          >
            {shortenMessage(lastmessage)}
          </p>
        </div>
      </div>
      <div className="text-right text-xs font-semibold">
        <p>{lastTimeMessage}</p>
      </div>
    </div>
  );
};

export default Chat;
