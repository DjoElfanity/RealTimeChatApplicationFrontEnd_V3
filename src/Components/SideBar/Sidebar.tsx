//  ecris moi une fonction tsx pour sidebar
import React, { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { TiPlusOutline } from "react-icons/ti";
import IconeApplication from "./IconeApplication";
import IconeGenerique from "./IconeGenerique";
import IconeUser from "./IconeUser";

interface SideBarProps {
  onIconeClick: (iconName: string) => void;
}

const Sidebar: React.FC<SideBarProps> = ({ onIconeClick }) => {
  const [activeIcon, setActiveIcon] = useState<string>("");
  const handleIconeClick = (iconName: string) => {
    setActiveIcon(iconName);
    onIconeClick(iconName);
  };
  return (
    <div className=" hidden bg-background-fort min-w-24 text-text p-3 flex-col justify-between items-center  sm:flex ">
      <IconeApplication />
      <div className="flex flex-col text-[20px] gap-12 p-2 justify-center items-center ">
        <IconeGenerique
          Icone={TiPlusOutline}
          title="Add Room"
          className={`border-2 border-transparent p-3 rounded-md transition duration-300 ease-in-out font-semibold ${
            activeIcon === "addRoom"
              ? "text-bold text-white bg-card-primary border-card-primary"
              : "hover:border-card-primary hover:text-bold hover:text-white hover:bg-card-primary"
          }`}
          onClick={() => handleIconeClick("addRoom")}
        />

        <IconeGenerique
          Icone={AiOutlineMessage}
          title="Messages"
          className={`border-2 border-transparent p-3 rounded-md transition duration-300 ease-in-out font-semibold ${
            activeIcon === "message"
              ? "text-bold text-white bg-card-primary border-card-primary"
              : "hover:border-card-primary hover:text-bold hover:text-white hover:bg-card-primary"
          }`}
          onClick={() => handleIconeClick("message")}
        />

        <IconeGenerique
          Icone={IoIosNotificationsOutline}
          title="Notifications"
          className={`border-2 border-transparent p-3 rounded-md transition duration-300 ease-in-out font-semibold ${
            activeIcon === "notification"
              ? "text-bold text-white bg-card-primary border-card-primary"
              : "hover:border-card-primary hover:text-bold hover:text-white hover:bg-card-primary"
          }`}
          onClick={() => handleIconeClick("notification")}
        />

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
      <IconeUser onUserClick={handleIconeClick} />
    </div>
  );
};

export default Sidebar;
