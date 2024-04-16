import React from "react";

import { useSelectedRoom } from "../../context/SelectedRoomContext";
import BottomPart from "./BottomPart";
import CenterPart from "./CenterPart";
import TopPart from "./TopPart";

const MessagePageContent: React.FC = () => {
  const { selectedRoom } = useSelectedRoom();

  return (
    <div className="flex  flex-col w-full  h-full">
      <div className="h-[70px] mb-5">
        <TopPart roomName={selectedRoom?.roomName || "DEFAULT"} />
      </div>
      <div className="flex-[2] ">
        <CenterPart
          roomId={
            typeof selectedRoom === "string"
              ? selectedRoom
              : selectedRoom?.roomId || "DEFAULT"
          }
        />
      </div>
      <div className="flex-[0.27] mt-1">
        <BottomPart />
      </div>
    </div>
  );
};

export default MessagePageContent;
