import * as signalR from "@microsoft/signalr";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const NotificationHub = () => {
  const { userId } = useAuth();

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5295/notificationshubs")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection.on("ReceiveNotification", (message) => {
      console.log("Notification received:", message);
      if (message.receiverId === userId) {
        console.log("Vous avez reçu une nouvelle notification");
        toast("Vous avez reçu une nouvelle notification", {
          position: "bottom-right",
        });
      }
    });

    connection.onclose(() => {
      console.log("Déconnecté du hub de notifications");
    });

    connection
      .start()
      .then(() => {
        console.log("Connecté au hub de notifications");
      })
      .catch((err) =>
        console.error(
          "Erreur de connexion au hub de notifications: ",
          err.toString()
        )
      );

    return () => {
      connection.stop();
    };
  }, [userId]);

  return null;
};

export default NotificationHub;
