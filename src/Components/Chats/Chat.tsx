import React, { useEffect, useRef, useState } from "react";
import DropdownMenu from "../../utils/DropDownMenu"; // Assurez-vous que le chemin d'importation est correct

interface ChatProps {
  id: string;
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
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const chatRef = useRef<HTMLDivElement>(null); // Référence pour le conteneur du chat

  const handleContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault(); // Empêche le menu contextuel par défaut de s'afficher
    if (chatRef.current) {
      const boundingRect = chatRef.current.getBoundingClientRect();
      setShowDropdown(true); // Affiche le menu déroulant personnalisé
      // Positionne le menu directement en haut du message (ajustez selon vos besoins)
      setDropdownPosition({ x: event.clientX, y: boundingRect.top });
    }
  };

  useEffect(() => {
    const closeDropdown = () => setShowDropdown(false);
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  const shortenMessage = (message: string): string => {
    if (!message) return "";
    return message.length > MAX_MESSAGE_LENGTH
      ? `${message.substring(0, MAX_MESSAGE_LENGTH)}...`
      : message;
  };

  return (
    <div
      ref={chatRef} // Appliquez la référence ici
      onClick={onClick}
      onContextMenu={handleContextMenu}
      className={`transition duration-400 ease-in-out flex items-start hover:text-white hover:bg-card-primary justify-between bg-background-leger p-3 rounded-xl cursor-pointer ${
        isSelected ? "text-white bg-card-primary" : "text-black"
      }`}
    >
      <div className="flex items-center relative">
        <img
          src={image}
          alt={`${firstname} ${lastname}`}
          className="w-12 h-12 object-fit rounded-full mr-3"
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
      {showDropdown && (
        <DropdownMenu
          position={dropdownPosition}
          onClose={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default Chat;
