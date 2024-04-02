import React from "react";
import { LuCircleDashed } from "react-icons/lu";

interface SideBarHeaderProps {
  header: string;
}

const SideBarHeader: React.FC<SideBarHeaderProps> = ({ header }) => {
  return (
    <div className="mt-[30px] flex justify-between items-center">
      <span className="font-semibold text-text text-[20px] mx-0.5">
        {header}
      </span>
      <div>
        <LuCircleDashed className="text-accent cursor-pointer" />
      </div>
    </div>
  );
};

export default SideBarHeader;
