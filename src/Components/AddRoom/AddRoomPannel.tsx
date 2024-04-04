import React, { useState } from "react";
import SideBarHeader from "../Common/SideBarHeader";
import AddRoomComponent from "./AddRoomComponent";
import RoomNameForm from "./RoomNameForm";

const AddRoomPanel: React.FC = () => {
  const [isDropped, setIsDropped] = useState(false);
  const [isSecondDropped, setIsSecondDropped] = useState(false);
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
    console.log("Form submitted with", { roomName, roomId, memberEmail });
    // Reset state logic here if needed
  };

  return (
    <div>
      <SideBarHeader header="Add Room" />
      <div className="flex flex-col mt-6">
        <div className="form-container mt-3 p-2 flex flex-col gap-4 max-h-[80vh] overflow-y-auto custom-scroll">
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

          {!isDropped && !isSecondDropped && (
            <div className="  text-center max-w-96 flex justify-center items-center ">
              <p className="flex justify-center items-center mt-5 p-2 border border-background-leger max-w-max text-wrap text-sm text-left">
                Welcome to the room creation and member addition section. Here,
                you can create a new room or add members to an existing one.
                Click on one of the options above to proceed
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddRoomPanel;