// src/pages/ChatPage.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLastMessage } from "../../api/MessageApi";
import { Room, fetchRooms } from "../../api/RoomApi";
import { useAuth } from "../../context/AuthProvider";
import { useSelectedRoom } from "../../context/SelectedRoomContext";
import { updateLastMessage } from "../../redux/actions/action";
import { RootState } from "../../store/store";
import { formatDate } from "../Common/FormatDate";
import SideBarHeader from "../Common/SideBarHeader";
import Chat from "./Chat";
import SearchBar from "./SearchBar";

interface RoomWithLastMessage extends Room {
  lastMessage: string | null;
  sendAt: string | null;
}

const ChatPage: React.FC = () => {
  const dispatch = useDispatch();
  const { userId } = useAuth();
  const { setSelectedRoom } = useSelectedRoom();
  const lastMessages = useSelector(
    (state: RootState) => state.message.lastMessages
  );

  const [rooms, setRooms] = useState<RoomWithLastMessage[]>([]);
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
                if (lastMessage && lastMessage.content && lastMessage.sendAt) {
                  // Dispatch the action to update the message and sendAt
                  dispatch(
                    updateLastMessage(
                      room.roomId,
                      lastMessage.content,
                      lastMessage.sendAt
                    )
                  );
                }
                return {
                  ...room,
                  lastMessage: lastMessage
                    ? lastMessage.content
                    : "No recent messages",
                  sendAt: lastMessage ? lastMessage.sendAt : null,
                };
              } catch (error) {
                console.error(
                  "Error fetching last message for room",
                  room.roomId,
                  error
                );
                return {
                  ...room,
                  lastMessage: "No recent messages",
                  sendAt: null,
                };
              }
            })
          );
          setRooms(roomsWithMessages);
        })
        .catch((error) => console.error("Rooms error:", error));
    }
    return () => source.cancel("Component unmounted");
  }, [userId, token, dispatch]);

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
            lastmessage={
              lastMessages[room.roomId]?.message || "No recent messages"
            }
            lastTimeMessage={
              lastMessages[room.roomId]?.sendAt
                ? formatDate(lastMessages[room.roomId]?.sendAt)
                : "Unknown time"
            }
            image="https://images.unsplash.com/photo-1519764622345-23439dd774f7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            isOnline={true}
            isSelected={false}
            onClick={() => {
              setSelectedRoom({
                roomId: room.roomId,
                roomName: room.name,
                status: true,
                imageUrl:
                  "https://images.unsplash.com/photo-1519764622345-23439dd774f7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatPage;
