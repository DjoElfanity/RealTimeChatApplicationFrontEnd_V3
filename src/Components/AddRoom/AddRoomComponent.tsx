import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";

interface AddRoomComponentProps {
  isDropped: boolean;
  toggleDropdown: () => void;
  title: string;
  description: string;
}

const AddRoomComponent: React.FC<AddRoomComponentProps> = ({
  isDropped,
  toggleDropdown,
  title,
  description,
}) => {
  return (
    <div
      onClick={toggleDropdown}
      className=" p-4  h-auto w-auto bg-background-leger rounded-lg flex justify-between items-center cursor-pointer"
      style={{ transition: "all 10s ease" }}
    >
      <div className="flex flex-col gap-1">
        <div className="font-bold text-black">{title}</div>
        <div className="text-[#7C7C7D] font-semibold text-sm">
          {description}
        </div>
      </div>
      <IoMdArrowDropdown
        className="text-lg text-black"
        style={{
          transition: "transform 0.5s ease",
          transform: isDropped ? "rotate(180deg)" : "rotate(0deg)",
        }}
      />
    </div>
  );
};

export default AddRoomComponent;
