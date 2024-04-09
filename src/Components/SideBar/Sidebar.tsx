import React, { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { TiPlusOutline } from "react-icons/ti";
import { notificationsData } from "../../data/data";
import IconeApplication from "./IconeApplication";
import IconeGenerique from "./IconeGenerique";
import IconeUser from "./IconeUser";

interface SideBarProps {
  onIconeClick: (iconName: string) => void;
  userId: string;
}

const Sidebar: React.FC<SideBarProps> = ({ onIconeClick, userId }) => {
  const activeNotifications = notificationsData.filter(
    (notification) => notification.isActive
  );
  const numberOfActiveNotifications = activeNotifications.length;
  const [activeIcon, setActiveIcon] = useState<string>("");
  const handleIconeClick = (iconName: string) => {
    setActiveIcon(iconName);
    onIconeClick(iconName);
  };
  return (
    <div className=" hidden bg-background-fort min-w-20 max-w-24 text-text p-3 flex-col justify-between items-center  sm:flex ">
      <IconeApplication />
      <div className="flex flex-col text-[20px] gap-12 p-2 justify-center items-center ">
        <IconeGenerique
          Icone={TiPlusOutline}
          title="Add Room"
          className={`border-2 border-transparent p-3 rounded-md transition     duration-300 ease-in-out font-semibold ${
            activeIcon === "addRoom"
              ? "text-bold text-white bg-card-primary border-card-primary"
              : "hover:border-card-primary hover:text-bold hover:text-white hover:bg-card-primary"
          }`}
          onClick={() => handleIconeClick("addRoom")}
        />

        <IconeGenerique
          Icone={AiOutlineMessage}
          title="Messages"
          className={` relative border-2 border-transparent p-3 rounded-md transition duration-300 ease-in-out font-semibold ${
            activeIcon === "message"
              ? "text-bold text-white bg-card-primary border-card-primary"
              : "hover:border-card-primary hover:text-bold hover:text-white hover:bg-card-primary"
          }`}
          onClick={() => handleIconeClick("message")}
        />
        <div
          className="relative z-50"
          onClick={() => handleIconeClick("notification")}
        >
          <div style={{ zIndex: 100 }}>
            <IconeGenerique
              Icone={IoIosNotificationsOutline}
              title="Notifications"
              className={`border-2 border-transparent p-3 rounded-md transition duration-300 ease-in-out font-semibold ${
                activeIcon === "notification"
                  ? "text-bold text-white bg-card-primary border-card-primary"
                  : "hover:border-card-primary hover:text-bold hover:text-white hover:bg-card-primary"
              }`}
            />
          </div>
          <div className="absolute top-2.5 right-3 ">
            <div className="rounded-full size-3 bg-green-600 flex justify-center items-center">
              <div className="font-bold cursor-pointer text-[10px]">
                {numberOfActiveNotifications}
              </div>
            </div>
          </div>
        </div>

        <IconeGenerique
          Icone={FaUsers}
          title="Friends"
          className={`border-2 border-transparent p-3 rounded-md transition duration-300 ease-in-out font-semibold ${
            activeIcon === "friends"
              ? "text-bold text-white bg-card-primary border-card-primary"
              : "hover:border-card-primary hover:text-bold hover:text-white hover:bg-card-primary"
          }`}
          onClick={() => handleIconeClick("friends")}
        />
      </div>
      <IconeUser onUserClick={handleIconeClick} userId={userId} />
    </div>
  );
};

export default Sidebar;
