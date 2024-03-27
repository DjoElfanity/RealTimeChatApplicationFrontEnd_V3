//  ecris moi une fonction tsx pour home
import React from "react";
import ChatPage from "../Components/Chats/ChatPage";
import Sidebar from "../Components/SideBar/Sidebar";

const Home: React.FC = () => {
  return (
    <div className="h-screen flex ">
      <Sidebar />
      <div className="bg-background-medium text-text px-5 w-1/3">
        <ChatPage />
      </div>
      <div className="px-5 bg-background-leger w-full">Contenu principale</div>
    </div>
  );
};

export default Home;
