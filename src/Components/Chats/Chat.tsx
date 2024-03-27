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
}

const Chat: React.FC<ChatProps> = ({
  firstname,
  lastname,
  lastmessage,
  lastTimeMessage,
  image,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`transition duration-400 ease-in-out flex items-start justify-between bg-background-leger p-3 rounded-xl cursor-pointer ${
        isSelected ? "text-white bg-card-primary" : "text-black"
      }`}
    >
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
          {/* Ici, on ajoute une condition pour changer la couleur du texte du dernier message */}
          <p className={`${isSelected ? "text-white" : "text-[#7C7C7D]"}`}>
            {lastmessage}
          </p>
        </div>
      </div>
      <div className="text-right text-xs">
        <p>{lastTimeMessage}</p>
      </div>
    </div>
  );
};

export default Chat;
