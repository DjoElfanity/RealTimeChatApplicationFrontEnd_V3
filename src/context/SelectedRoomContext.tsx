// context/SelectedRoomContext.tsx
import React, { ReactNode, createContext, useContext, useState } from "react";

type SelectedRoomContextType = {
  selectedRoom: {
    roomId: string | null;
    roomName: string;
    status: boolean;
    imageUrl: string;
  } | null;
  setSelectedRoom: (room: SelectedRoomContextType["selectedRoom"]) => void;
};

const SelectedRoomContext = createContext<SelectedRoomContextType | null>(null);

export const useSelectedRoom = () => {
  const context = useContext(SelectedRoomContext);
  if (!context) {
    throw new Error(
      "useSelectedRoom must be used within a SelectedRoomProvider"
    );
  }
  return context;
};

interface SelectedRoomProviderProps {
  children: ReactNode;
}

export const SelectedRoomProvider: React.FC<SelectedRoomProviderProps> = ({
  children,
}) => {
  const [selectedRoom, setSelectedRoom] = useState<SelectedRoomContextType["selectedRoom"]>(null);
  return (
    <SelectedRoomContext.Provider value={{ selectedRoom, setSelectedRoom }}>
      {children}
    </SelectedRoomContext.Provider>
  );
};
