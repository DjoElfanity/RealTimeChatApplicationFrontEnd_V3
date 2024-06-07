import * as signalR from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import BottomPart from "./BottomPart";
import CenterPart from "./CenterPart";

const SignalRGestion = ({ roomId }) => {
  const { userId } = useAuth(); // Assurez-vous que cette fonction fournit l'ID de l'utilisateur correct.
  const token = localStorage.getItem("token");
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );

  useEffect(() => {
    const connect = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5284/chatHub", {
        accessTokenFactory: () => token || "",
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    const startConnection = async () => {
      try {
        await connect.start();
        console.log("Connected!");
        await connect.invoke("JoinRoom", userId, roomId);
      } catch (err) {
        console.error("Connection failed: ", err);
      }
    };

    startConnection();

    setConnection(connect);

    return () => {
      connect.stop();
    };
  }, [roomId, userId, token]);

  return (
    <>
      <CenterPart roomId={roomId} connection={connection} />
      <BottomPart roomId={roomId} connection={connection} />
    </>
  );
};

export default SignalRGestion;
