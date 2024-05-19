import React, { useRef, useState } from "react";
import { User } from "../../api/UserApi";
import DropdownMenu from "../../utils/DropDownMenu"; // Assurez-vous que le chemin d'importation est correct

interface FriendItemProps {
  friend: User;
  // onClick: () => void; // Ajout d'une fonction onClick pour la gestion des clics
}

const FriendItem: React.FC<FriendItemProps> = ({ friend }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const friendRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault(); // Empêche le menu contextuel par défaut de s'afficher
    if (friendRef.current) {
      const boundingRect = friendRef.current.getBoundingClientRect();
      setShowDropdown(true);
      setDropdownPosition({ x: event.clientX, y: boundingRect.top });
    }
  };

  return (
    <>
      <div
        ref={friendRef} // Appliquez la référence ici
        // onClick={onClick}
        onContextMenu={handleContextMenu}
        className={`transition duration-400 ease-in-out flex items-start hover:text-white hover:bg-card-primary justify-between bg-background-leger p-3 rounded-xl cursor-pointer w-full`}
      >
        <div className="flex items-center relative">
          <img
            src="https://via.placeholder.com/50"
            alt={`${friend.firstName} ${friend.lastName}`}
            className="w-12 h-12 object-cover rounded-full mr-3"
          />
          <div
            className={`${
              friend.status === "Online" ? "bg-green-500" : "bg-red-500"
            } p-1.5 bottom-0 left-8 rounded-full absolute`}
          ></div>
          <div>
            <div className="font-semibold text-black">
              {friend.firstName} {friend.lastName}
            </div>
          </div>
        </div>
        {showDropdown && (
          <DropdownMenu
            position={dropdownPosition}
            onClose={() => setShowDropdown(false)}
          />
        )}
      </div>
    </>
  );
};

export default FriendItem;
