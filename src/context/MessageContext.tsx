import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { fetchLastMessage } from "../api/MessageApi";

interface MessageContextType {
  lastMessage: string | null;
  updateLastMessage: (message: string) => void;
  fetchAndUpdateLastMessage: (roomId: string) => Promise<void>;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessageContext must be used within a MessageProvider');
  }
  return context;
};

interface MessageProviderProps {
  children: ReactNode;
}

export const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const token = localStorage.getItem("token"); // Assurez-vous de gérer le token de manière sécurisée et adéquate.

  const fetchAndUpdateLastMessage = async (roomId: string) => {
    const source = axios.CancelToken.source();
    try {
      const message = await fetchLastMessage(roomId, token, source);
      setLastMessage(message);
    } catch (error) {
      console.error("Error fetching last message:", error);
    }
  };

  const updateLastMessage = (message: string) => {
    setLastMessage(message);
  };

  return (
    <MessageContext.Provider
      value={{ lastMessage, updateLastMessage, fetchAndUpdateLastMessage }}
    >
      {children}
    </MessageContext.Provider>
  );
};