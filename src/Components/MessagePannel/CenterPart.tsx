import React from "react";
import { useAuth } from "../../context/AuthProvider";
import Message from "./Messages";

interface MessagesProps {
  roomId: string;
}

const CenterPart: React.FC<MessagesProps> = ({ roomId }) => {
  const { userId } = useAuth(); // Récupérer l'ID de l'utilisateur connecté

  return <Message roomId={roomId} userId={userId || ""} />;
};

export default CenterPart;
