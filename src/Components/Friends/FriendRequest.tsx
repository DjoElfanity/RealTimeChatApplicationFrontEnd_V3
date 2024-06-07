import axios from "axios";
import React, { useRef, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import {
  FriendRequestType,
  acceptFriendRequest,
  rejectFriendRequest,
} from "../../api/UserApi";
import DropdownMenu from "../../utils/DropDownMenu";

interface FriendRequestProps {
  friendRequest: FriendRequestType;
  refetchRequests: () => void;
  refetchFriends: () => void;
  removeRequest: (id: string) => void;
}

const FriendRequest: React.FC<FriendRequestProps> = ({
  friendRequest,
  refetchRequests,
  refetchFriends,
  removeRequest,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const requestRef = useRef<HTMLDivElement>(null);
  const source = axios.CancelToken.source();

  const handleAcceptFriendRequest = async () => {
    const token = localStorage.getItem("token");
    try {
      await acceptFriendRequest(
        friendRequest.id,
        friendRequest.requesterId,
        friendRequest.recipientId,
        token as string,
        source
      );
      removeRequest(friendRequest.id); // Retirer la demande acceptée de l'état local
      await refetchFriends(); // Rafraîchir la liste des amis
      await refetchRequests(); // Rafraîchir les demandes d'amis
    } catch (error) {
      console.error("Failed to accept friend request:", error);
    }
  };

  const handleRejectFriendRequest = async () => {
    const token = localStorage.getItem("token");
    try {
      await rejectFriendRequest(
        friendRequest.id,
        friendRequest.recipientId,
        token as string,
        source
      );
      removeRequest(friendRequest.id); // Retirer la demande rejetée de l'état local
      await refetchRequests(); // Rafraîchir les demandes d'amis
    } catch (error) {
      console.error("Failed to reject friend request:", error);
    }
  };

  const handleContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (requestRef.current) {
      const boundingRect = requestRef.current.getBoundingClientRect();
      setShowDropdown(true);
      setDropdownPosition({ x: event.clientX, y: boundingRect.top });
    }
  };

  return (
    <div
      ref={requestRef}
      onContextMenu={handleContextMenu}
      className="flex items-start justify-between bg-background-leger p-3 rounded-xl w-full"
    >
      <div className="flex items-center w-full justify-between">
        <div className="font-semibold text-black">
          {friendRequest.requesterEmail}
        </div>
        <div className="flex">
          <button
            className="bg-green-500 text-white rounded-lg p-2.5 m-1 flex items-center gap-2 hover:bg-green-600 transition-colors ease-in-out"
            onClick={handleAcceptFriendRequest}
          >
            <FaCheck />
          </button>
          <button
            className="bg-red-500 text-white rounded-lg p-2.5 m-1 flex items-center gap-2 hover:bg-red-600 transition-colors ease-in-out"
            onClick={handleRejectFriendRequest}
          >
            <FaTimes />
          </button>
        </div>
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

export default FriendRequest;
