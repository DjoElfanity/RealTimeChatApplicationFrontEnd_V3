"use client";

const DropdownMenu = ({ position, onClose }) => {
  // Assurez-vous d'ajuster le style pour positionner correctement le menu déroulant
  return (
    <div
      style={{
        position: "fixed",
        top: `${position.y}px`,
        left: `${position.x}px`,
        zIndex: 1000,
      }}
    >
      <div className="bg-white rounded-md shadow-lg transition duration-200 ease-in-out">
        <ul>
          <li className="p-2 hover:bg-gray-100 cursor-pointer text-black">
            Option 1
          </li>
          <li className="p-2 hover:bg-gray-100 cursor-pointer text-black">
            Option 2
          </li>
          <li className="p-2 hover:bg-gray-100 cursor-pointer text-black">
            Option 3
          </li>
          {/* Autres options du menu ici */}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
