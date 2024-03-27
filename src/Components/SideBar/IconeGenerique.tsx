// IconeGenerique.tsx
import React from "react";

interface IconeGeneriqueProps {
  Icone: React.ElementType; // Permet de passer un composant d'icône
  onClick?: () => void; // Optionnel: Une fonction à exécuter lors du clic sur l'icône
  className?: string; // Permet de personnaliser le style de l'icône
  title?: string; // Un texte d'accessibilité pour l'icône
}

const IconeGenerique: React.FC<IconeGeneriqueProps> = ({
  Icone,
  onClick,
  className,
  title,
}: IconeGeneriqueProps) => {
  return (
    <div
      onClick={onClick}
      className={` transition duration-400  ease-in-out  font-semibold cursor-pointer ${className}`}
      title={title}
    >
      <Icone />
    </div>
  );
};

export default IconeGenerique;
