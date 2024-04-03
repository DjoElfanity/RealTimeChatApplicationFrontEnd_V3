//  ecris moi une fonction tsx pour home
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

  return (
    <div className="h-screen flex ">
      {/* SideBar */}
      <Sidebar onIconeClick={handleIconeClick} />
      {/* MainContent */}
      <div className="bg-background-medium text-text px-5 min-w-96 max-w-96 relative ">
        {currentPanel === "message" && <ChatPage />}
        {currentPanel === "addRoom" && <AddRoom />}
        {currentPanel === "notification" && <Notifications />}
        {currentPanel === "friends" && <Friends />}
        {currentPanel === "user" && <UserInfo />}
        {/* Footer */}
        <div className="sm:hidden text-white  absolute bottom-0 lewft-0">
          footer
        </div>
      </div>

      <div className="px-5  bg-background-leger w-full">
        <WelcomePage name="John Doe" />
      </div>
    </div>
  );
};

export default Home;
