import React from "react";
import { FaTimes } from "react-icons/fa";

interface NotificationsReceivedMessageProps {
  name?: string;
  id: number;
  setActive: (id: number, active: boolean) => void;
}
//Je veux garder la meme structure que les autres notifications
//Ici il n'y'aura pas de bouton accepter ou refuser
const NotificationsReceivedMessage: React.FC<
  NotificationsReceivedMessageProps
> = ({ name, id, setActive }) => {
  return (
    <div>
      <div className="bg-background-leger p-3.5 mt-6 rounded-lg flex  items-center gap-2 mr-2 ">
        <div className="flex flex-col ">
          <div className="text-md font-bold text-black flex justify-between items-center">
            <div>Notifications :</div>
            <div>
              <FaTimes
                className="text-xs cursor-pointer hover:"
                onClick={() => setActive(id, false)}
              />
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Vous avez reçu un message de la part de
            <span className="font-semibold"> {name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsReceivedMessage;
