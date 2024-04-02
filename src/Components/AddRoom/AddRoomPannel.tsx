import React, { useState } from "react";
import SideBarHeader from "../Common/SideBarHeader";
import AddRoomComponent from "./AddRoomComponent";
import RoomNameForm from "./RoomNameForm"; // Assurez-vous que RoomNameForm est maintenant le formulaire générique

const AddRoomPanel: React.FC = () => {
  const [isDropped, setIsDropped] = useState(false);
  const [isSecondDropped, setIsSecondDropped] = useState(false);
  // États pour les valeurs des champs de formulaire
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [memberEmail, setMemberEmail] = useState("");

  const toggleDropdown = () => setIsDropped(!isDropped);
  const toggleSecondDropdown = () => setIsSecondDropped(!isSecondDropped);

  const fieldsForCreateRoom = [
    {
      label: "Room Name",
      name: "roomName",
      value: roomName,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setRoomName(e.target.value),
      placeholder: "Ex: Room number 1",
    },
  ];

  const fieldsForAddMembers = [
    {
      label: "Room Id",
      name: "roomId",
      value: roomId,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setRoomId(e.target.value),
      placeholder: "Ex: 123456",
    },
    {
      label: "Member Email",
      name: "memberEmail",
      value: memberEmail,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setMemberEmail(e.target.value),
      placeholder: "member@example.com",
    },
  ];

  const handleSubmit = () => {
    console.log("Form submitted");
    // Ajoutez ici la logique de soumission de votre formulaire
    // N'oubliez pas de réinitialiser les états si nécessaire
  };

  return (
    <div>
      <SideBarHeader header="Add Room" />
      <div className="flex flex-col mt-10">
        <div className="form-container mt-3 p-2 flex flex-col gap-4 max-h-[80vh] overflow-y-auto custom-scroll">
          <style>
            {`
              .custom-scroll::-webkit-scrollbar {
                width: 4px;
              }
              .custom-scroll::-webkit-scrollbar-track {
                background-color: rgba(229, 231, 235, var(--bg-opacity));
              }
              .custom-scroll::-webkit-scrollbar-thumb {
                background-color: #a0aec0;
              }
            `}
          </style>

          <AddRoomComponent
            isDropped={isDropped}
            toggleDropdown={toggleDropdown}
            title="Create a room"
            description="Create a new room and start a conversation"
          />
          {isDropped && (
            <RoomNameForm
              fields={fieldsForCreateRoom}
              onSubmit={handleSubmit}
            />
          )}

          <AddRoomComponent
            isDropped={isSecondDropped}
            toggleDropdown={toggleSecondDropdown}
            title="Add members to a room"
            description="Add members to an existing room and start a conversation"
          />
          {isSecondDropped && (
            <RoomNameForm
              fields={fieldsForAddMembers}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddRoomPanel;
