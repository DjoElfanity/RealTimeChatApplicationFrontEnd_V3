import { useEffect, useRef, useState } from "react";
import SingleMessage from "./SingleMessage";

interface MessageProps {
  roomId: string;
  userId: string;
}

interface Message {
  id: string;
  content: string;
  userId: string;
}

const Message: React.FC<MessageProps> = ({ roomId, userId }) => {
  const [messages, setMessages] = useState<Message[]>([]); // État pour stocker les messages
  const messagesContainerRef = useRef<HTMLDivElement>(null); // Réf pour automatiser le défilement

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

  // Effet pour défiler automatiquement vers le bas à chaque mise à jour des messages
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={messagesContainerRef}
      className="max-h-[70vh] overflow-y-auto custom-scroll bg-[#EAF2FE] size-full gap-2 flex flex-col"
    >
      {/* Afficher les messages */}
      {messages.map((message) => (
        <SingleMessage
          key={message.id}
          message={message}
          isCurrentUser={message.userId === userId}
        />
      ))}
    </div>
  );
};

export default Message;
