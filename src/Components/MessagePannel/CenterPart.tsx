import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";

// Définir une interface pour les messages
interface Message {
  id: string;
  content: string;
  userId: string;
}

interface MessagesProps {
  roomId: string;
}

const CenterPart: React.FC<MessagesProps> = ({ roomId }) => {
  const { userId } = useAuth(); // Récupérer l'ID de l'utilisateur connecté
  const [messages, setMessages] = useState<Message[]>([]); // État pour stocker les messages

  // Fonction pour récupérer les messages
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:5284/api/Message/${roomId}/messages`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data: Message[] = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Fetching messages failed", error);
    }
  };

  // Effet pour récupérer les messages lorsque l'ID de la salle change
  useEffect(() => {
    if (roomId) {
      fetchMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  return (
    <div className="bg-white size-full gap-2 flex flex-col ">
      {/* Afficher les messages */}
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex flex-row ${
            message.userId === userId ? "justify-end" : ""
          } mx-8`}
        >
          <div
            className={`flex flex-col  ${
              message.userId === userId ? "text-right" : "text-red"
            }`}
          >
            <div className="flex">{message.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CenterPart;
