import React from "react";
import { useAuth } from "../../context/AuthProvider";
import Message from "./Messages";

interface MessagesProps {
  roomId: string;
  connection: signalR.HubConnection | null; // Ajouter cette prop pour la connexion
}

const CenterPart: React.FC<MessagesProps> = ({ roomId, connection }) => {
  const { userId } = useAuth();

  return (
    <Message roomId={roomId} userId={userId || ""} connection={connection} />
  );
};

export default CenterPart;
