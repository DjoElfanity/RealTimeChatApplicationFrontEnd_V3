import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";

const TopPart: React.FC = () => {
  return (
    <div
      className="  size-full bg-[#D0E3FF] text-text flex items-center justify-between px-6 py-2 border-b-2 border-[#D0E3FF]
          "
    >
      <div className="flex">
        {/* Image de profile */}
        <div>
          <img
            src={
              "https://images.unsplash.com/photo-1519764622345-23439dd774f7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={"profile picture"}
            className="w-12 h-12 object-fit rounded-full mr-3 cursor-pointer"
          />
        </div>
        {/* Informations du profil */}
        <div>
          <p className="text-black font-bold">Elfanity jad</p>
          <p className="text-[#696969]">Online</p>
        </div>
      </div>

      <div className="gap-5 inline-flex">
        <div>
          <IoSearchOutline className="cursor-pointer size-5 text-black" />
        </div>

        <div>
          <IoIosArrowDown className="cursor-pointer size-5 text-black" />
        </div>
      </div>
    </div>
  );
};

export default TopPart;
