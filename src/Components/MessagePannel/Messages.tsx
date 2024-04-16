import * as signalR from "@microsoft/signalr";
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

const token = localStorage.getItem("token");

const Message: React.FC<MessageProps> = ({ roomId, userId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [, setConnection] = useState<signalR.HubConnection | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (roomId) {
      const connect = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5284/chatHub", {
          accessTokenFactory: () => token || "",
        })
        .configureLogging(signalR.LogLevel.Information)
        .build();

      connect
        .start()
        .then(() => {
          console.log("Connected!");
          connect
            .invoke("JoinRoom", "userDecoded.given_name", roomId)
            .catch((error) => console.error(error));

          connect.on("ReceiveMessage", (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
          });

          connect.on("RoomJoined", (roomMessage: string) => {
            console.log(roomMessage);
          });

          connect.on("UserJoined", (userMessage: string) => {
            console.log(userMessage);
          });
        })
        .catch((err) => console.error("Connection failed: ", err));

      setConnection(connect);

      return () => {
        connect.stop();
      };
    }
  }, [roomId]);

  return (
    <div
      className="
    max-h-[70vh] overflow-y-auto custom-scroll
    bg-[#EAF2FE] size-full gap-2 flex flex-col"
    >
      {/* Afficher les messages */}
      {messages.map((message) => (
        <SingleMessage
          key={message.id}
          message={message}
          isCurrentUser={message.userId === userId}
        />
      ))}
      {/* Balise pour le défilement automatique */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Message;
