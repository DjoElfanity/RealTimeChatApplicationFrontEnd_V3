import React from "react";

import BottomPart from "./BottomPart";
import CenterPart from "./CenterPart";
import TopPart from "./TopPart";

const MessagePageContent: React.FC = () => {
  return (
    <div className="flex  flex-col w-full  h-full">
      <div className="h-[70px]">
        <TopPart />
      </div>
      <div className="flex-[2]">
        <CenterPart />
      </div>
      <div className="flex-[0.27]">
        <BottomPart />
      </div>
    </div>
  );
};

export default MessagePageContent;
