//  ecris moi une fonction tsx pour sidebar
import React, { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { TiPlusOutline } from "react-icons/ti";
import IconeApplication from "./IconeApplication";
import IconeGenerique from "./IconeGenerique";
import { IconeUser } from "./IconeUser";

const Sidebar: React.FC = () => {
  const [activeIcon, setActiveIcon] = useState<string>("");
  return (
    <div className=" hidden bg-background-fort max-w-28 text-text p-3 flex-col justify-between items-center  sm:flex ">
      <IconeApplication />
      <div className="flex flex-col gap-12 p-2 justify-center items-center">
        <IconeGenerique
          Icone={TiPlusOutline}
          title="Add Room"
          className={`${
            activeIcon === "addRoom"
              ? "text-bold text-white border p-3 rounded-md bg-card-primary "
              : "text-text"
          }`}
          onClick={() => setActiveIcon("addRoom")}
        />

        <IconeGenerique
          Icone={AiOutlineMessage}
          title="Messages"
          className={`${
            activeIcon === "message"
              ? "text-bold text-white border p-3 rounded-md bg-card-primary "
              : "text-text"
          }`}
          onClick={() => setActiveIcon("message")}
        />

        <IconeGenerique
          Icone={IoIosNotificationsOutline}
          title="Notifications"
          className={`${
            activeIcon === "notification"
              ? "text-bold text-white border p-3 rounded-md bg-card-primary "
              : "text-text"
          }`}
          onClick={() => setActiveIcon("notification")}
        />

        <IconeGenerique
          Icone={FaUsers}
          title="Friends"
          className={`${
            activeIcon === "friends"
              ? "text-bold text-white border p-3 rounded-md bg-card-primary "
              : "text-text"
          }`}
          onClick={() => setActiveIcon("friends")}
        />
      </div>
      <IconeUser />
    </div>
  );
};

export default Sidebar;
