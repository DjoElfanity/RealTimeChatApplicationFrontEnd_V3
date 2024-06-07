import React from "react";

interface WelcomePageProps {
  name: string;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ name }) => {
  return (
    <div className=" flex justify-center items-center h-screen  flex-col">
      <h1 className="text-">Bienvenue, {name}!</h1>
    </div>
  );
};

export default WelcomePage;
