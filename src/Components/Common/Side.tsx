import { useSelectedRoom } from "../../context/SelectedRoomContext";

const Side = () => {
  const { selectedRoom } = useSelectedRoom();

  return (
    <div>
      <h1>Room Details</h1>
      {selectedRoom ? (
        <div>
          <p>Room ID: {selectedRoom.roomId}</p>
          <p>Room Name: {selectedRoom.roomName}</p>
        </div>
      ) : (
        <p>No room selected</p>
      )}
    </div>
  );
};

export default Side;
