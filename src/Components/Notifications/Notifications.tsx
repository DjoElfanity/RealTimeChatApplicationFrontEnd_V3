import React, { useState } from "react";
import { notificationsData } from "../../data/data";
import SideBarHeader from "../Common/SideBarHeader";
import NotificationsJoiningRoomRequest from "./NotificationsJoiningRoomRequest";
import NotificationsReceivedMessage from "./NotificationsReceivedMessage";

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState(notificationsData); // Add this

  const setActive = (id: number, active: boolean) => {
    // Add this
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isActive: active }
          : notification
      )
    );
  };

  return (
    <>
      <SideBarHeader header="Notifications" />

      <div className="custom-scroll h-[80%] overflow-y-auto ">
        {notifications.map((notification) => {
          if (notification.type === "message" && notification.isActive) {
            return (
              <NotificationsReceivedMessage
                key={notification.id}
                name={notification.name}
                id={notification.id}
                setActive={setActive}
              />
            );
          } else if (
            notification.type === "roomRequest" &&
            notification.isActive
          ) {
            return (
              <NotificationsJoiningRoomRequest
                key={notification.id}
                name={notification.name}
                id={notification.id}
                setActive={setActive}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    </>
  );
};

export default Notifications;
