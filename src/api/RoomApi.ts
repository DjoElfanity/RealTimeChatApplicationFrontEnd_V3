// api/room.ts
import axios, { CancelTokenSource } from "axios";

const BASE_URL = "http://localhost:5187/api/Room/";

export interface Room {
  roomId: string;
  ownerId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  members: { userId: string; role: string }[];
}

// Fonction pour récupérer les salles de chat
export const fetchRooms = async (
  userId: string,
  token: string,
  source: CancelTokenSource
): Promise<Room[]> => {
  if (!userId) throw new Error("UserID is required");

  const response = await axios.get<{ room: Room }[]>(
    `${BASE_URL}ByOwner/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cancelToken: source.token,
    }
  );

  return response.data.map((apiRoom) => apiRoom.room);
};
