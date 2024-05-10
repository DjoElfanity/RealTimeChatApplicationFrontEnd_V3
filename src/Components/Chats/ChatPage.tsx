// src/pages/ChatPage.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLastMessage } from "../../api/MessageApi";
import { Room, fetchRooms } from "../../api/RoomApi";
import { fetchUsersById } from "../../api/UserApi";
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
  roomType: "group" | "friendship";
  otherUser?: string;
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
              let lastMessage = null;
              try {
                lastMessage = await fetchLastMessage(
                  room.roomId,
                  token,
                  source
                );
              } catch (error) {
                console.error(
                  "Error fetching last message for room",
                  room.roomId,
                  error
                );
              }
              if (lastMessage && lastMessage.content && lastMessage.sendAt) {
                dispatch(
                  updateLastMessage(
                    room.roomId,
                    lastMessage.content,
                    lastMessage.sendAt
                  )
                );
              }

              // Fetch user details
              const otherUserId = room.members.find(
                (m) => m.userId !== userId
              )?.userId;
              console.log(otherUserId);
              let otherUser = "";
              if (otherUserId) {
                try {
                  const user = await fetchUsersById(otherUserId, token, source);
                  otherUser = `${user.firstName} ${user.lastName}`;
                  console.log(otherUser);
                } catch (error) {
                  console.error("Error fetching user:", error);
                }
              }

              return {
                ...room,
                lastMessage: lastMessage
                  ? lastMessage.content
                  : "No recent messages",
                sendAt: lastMessage ? lastMessage.sendAt : null,
                otherUser: otherUser,
              };
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
            firstname={
              room.roomType === "group"
                ? room.name
                : room.otherUser || "Unknown user"
            }
            lastname=""
            lastmessage={lastMessages[room.roomId]?.message || room.lastMessage}
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
                roomName:
                  room.roomType === "group"
                    ? room.name
                    : room.otherUser || "Unknown user",
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
