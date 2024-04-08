import axios, { CancelTokenSource } from "axios";

const BASE_URL = "http://localhost:5284/api/Message";

export interface Message {
  content: string;
  sendAt: string;
  updatedAt: string;
  roomId: string;
  userId: string;
}

//Recuperer le dernier message d'une salle de chat
export const fetchLastMessage = async (
  roomId: string,
  token: string,
  source: CancelTokenSource
): Promise<Message> => {
  const response = await axios.get<Message>(
    `${BASE_URL}/${roomId}/last-message`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cancelToken: source.token,
    }
  );
  return response.data;
};
