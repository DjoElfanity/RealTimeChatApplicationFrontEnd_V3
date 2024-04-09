import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import AddRoom from "../Components/AddRoom/AddRoomPannel";
import ChatPage from "../Components/Chats/ChatPage";
import Friends from "../Components/Friends/Friends";
import Notifications from "../Components/Notifications/Notifications";
import Sidebar from "../Components/SideBar/Sidebar";
import UserInfo from "../Components/User/UserInfo";
import WelcomePage from "../Components/WelcomePage/WelcomePage";

const Home: React.FC = () => {
  const [currentPanel, setCurrentPanel] = useState<string>("addRoom");

  const handleIconeClick = (iconName: string) => {
    setCurrentPanel(iconName);
  };

  const renderCurrentPanel = (panelName: string) => {
    switch (panelName) {
      case "message":
        return <ChatPage />;
      case "addRoom":
        return <AddRoom />;
      case "notification":
        return <Notifications />;
      case "friends":
        return <Friends />;
      case "user":
        return <UserInfo />;
      default:
        return null; // Ou un composant par défaut
    }
  };

  return (
    <div className="h-screen flex ">
      <Sidebar onIconeClick={handleIconeClick} />
      <div className="bg-background-medium text-text px-5 w-full relative sm:min-w-96 sm:max-w-96      ">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPanel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentPanel(currentPanel)}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="sm:hidden text-white  absolute bottom-0 left-0">
        footer
      </div>

      <div className="px-5 bg-background-leger w-full hidden sm:block">
        <WelcomePage name="John Doe" />
      </div>
    </div>
  );
};

export default Home;
