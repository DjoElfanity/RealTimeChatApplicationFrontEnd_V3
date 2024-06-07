import axios from "axios";
import React, { useEffect, useState } from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";

interface IconeUserProps {
  onUserClick: (iconName: string) => void;
  userId: string;
}

const IconeUser: React.FC<IconeUserProps> = ({ onUserClick, userId }) => {
  // Initialiser user comme un tableau vide
  const [user, setUser] = useState<
    { id: string; firstName: string; lastName: string; image: string }[]
  >([]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return; // Sortie anticipée si userId n'est pas défini
      try {
        const response = await axios.get(
          `http://localhost:5150/api/User/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // Mettre à jour l'état avec un tableau contenant l'objet de l'utilisateur
        setUser([
          {
            id: response.data.id,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            image:
              "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        ]);
      } catch (error) {
        console.error("User error:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleUserClick = () => {
    onUserClick("user");
  };

  // Passer l'état user à AnimatedTooltip
  return (
    <div
      className="flex items-center justify-center cursor-pointer"
      onClick={handleUserClick}
    >
      <AnimatedTooltip items={user} />
    </div>
  );
};

export default IconeUser;
