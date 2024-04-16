// Importation des hooks et composants React
import axios from "axios";
import React, { useEffect, useState } from "react";
import { fetchLastMessage } from "../../api/MessageApi";
import { Room, fetchRooms } from "../../api/RoomApi";
import { useAuth } from "../../context/AuthProvider";
import { useSelectedRoom } from "../../context/SelectedRoomContext"; // Importer le hook de contexte
import { formatDate } from "../Common/FormatDate";
import SideBarHeader from "../Common/SideBarHeader";
import Chat from "./Chat";
import SearchBar from "./SearchBar";

interface RoomWithLastMessage extends Room {
  lastMessage: string | null;
  sendAt: string | null;
}

const ChatPage: React.FC = () => {
  const { userId } = useAuth();
  const [rooms, setRooms] = useState<RoomWithLastMessage[]>([]);
  const { setSelectedRoom } = useSelectedRoom(); // Utiliser le hook pour mettre à jour le contexte
  const token = localStorage.getItem("token");

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (userId && token) {
      fetchRooms(userId, token, source)
        .then(async (rooms) => {
          const roomsWithMessages = await Promise.all(
            rooms.map(async (room) => {
              try {
                const lastMessage = await fetchLastMessage(
                  room.roomId,
                  token,
                  source
                );
                return {
                  ...room,
                  lastMessage: lastMessage.content,
                  sendAt: lastMessage.sendAt,
                }; // Supposons que `content` contient le texte du dernier message
              } catch (error) {
                console.error(
                  "Error fetching last message for room",
                  room.roomId,
                  error
                );
                return { ...room, lastMessage: null, sendAt: null };
              }
            })
          );
          setRooms(roomsWithMessages);
        })
        .catch((error) => console.error("Rooms error:", error));
    }

    return () => source.cancel("Component unmounted");
  }, [userId, token]);

  return (
    <div className="max-h-[calc(100vh)] overflow-y-hidden">
      <SideBarHeader header="Chats" />
      <SearchBar />
      <div className="mt-3 p-2 flex flex-col pr-3 gap-4 custom-scroll max-h-[75vh] overflow-y-auto">
        {rooms.map((room) => (
          <Chat
            key={room.roomId}
            id={room.roomId}
            firstname={room.name}
            lastname=""
            lastmessage={room.lastMessage || "No recent messages"}
            lastTimeMessage={
              room.sendAt ? formatDate(room.sendAt) : "Unknown time"
            }
            image="https://images.unsplash.com/photo-1519764622345-23439dd774f7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            isOnline={true}
            isSelected={false} // Vous pourriez vouloir ajouter une logique de sélection ici si nécessaire
            onClick={() => {
              setSelectedRoom({
                roomId: room.roomId,
                roomName: room.name,
                status: true, // Supposons que vous ayez un moyen de déterminer si la salle est en ligne
                imageUrl:
                  "https://images.unsplash.com/photo-1519764622345-23439dd774f7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Image URL
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatPage;
