import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

interface Props {
  name: string;
  id: number; // Add this
  setActive: (id: number, active: boolean) => void; // Add this
}

const NotificationsJoiningRoomRequest: React.FC<Props> = ({
  name,
  id,
  setActive,
}) => {
  return (
    <div>
      <div className="bg-background-leger p-3.5 mt-6 rounded-lg flex justify-center items-center gap-2 mr-2">
        <div className="flex flex-col ">
          <div className="text-md font-bold text-black">
            Notifications : Demande de rejoindre la salle
          </div>
          <div className="text-sm text-gray-500">
            Vous avez reçu une demande de la part de{" "}
            <span className="font-semibold ">{name}</span> pour rejoindre la
            salle
          </div>
        </div>
        <div className="flex flex-col">
          <button className="bg-green-500 text-white rounded-lg p-2.5 m-1 flex items-center gap-2 hover:bg-green-600 transition-colors ease-in-out">
            <FaCheck />
          </button>
          <button
            className=" bg-red-500 text-white rounded-lg p-2.5 m-1 flex items-center gap-2 hover:bg-red-600 transition-colors ease-in-out"
            onClick={() => setActive(id, false)} // Add this
          >
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsJoiningRoomRequest;
