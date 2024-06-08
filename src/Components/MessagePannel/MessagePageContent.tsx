import * as signalR from "@microsoft/signalr";
import React, { useEffect, useState } from "react";
import { useSelectedRoom } from "../../context/SelectedRoomContext";
import BottomPart from "./BottomPart";
import CenterPart from "./CenterPart";
import TopPart from "./TopPart";

const MessagePageContent: React.FC<{ toggleInfoPanel: () => void }> = ({
  toggleInfoPanel,
}) => {
  const { selectedRoom } = useSelectedRoom();
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );

  useEffect(() => {
    const connect = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5284/chatHub", {
        accessTokenFactory: () => localStorage.getItem("token") || "",
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connect.start().catch((err) => console.error("Connection failed: ", err));
    setConnection(connect);

    return () => {
      connect.stop();
    };
  }, [selectedRoom]);

  return (
    <div className="flex  flex-col w-full  h-full">
      <div className="h-[70px] mb-5">
        <TopPart
          roomName={selectedRoom?.roomName || "DEFAULT"}
          toggleInfoPanel={toggleInfoPanel}
        />
      </div>
      <div className="flex-[2] ">
        <CenterPart
          roomId={selectedRoom?.roomId || "DEFAULT"}
          connection={connection}
        />
      </div>
      <div className="flex-[0.27] mt-1">
        <BottomPart
          roomId={selectedRoom?.roomId || ""}
          connection={connection}
        />
      </div>
    </div>
  );
};

export default MessagePageContent;
