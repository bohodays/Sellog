import React, { useState } from "react";
import { ChairEdit } from "../RoomEditItems/Models/ChairEdit";
import { WoodDesk } from "@/components/ItemShop/ItemItem/Models/WoodDesk";

// type PropsType = {
//   isDragging: boolean;
//   setIsDragging: any;
// };

const RoomEditContainer = () => {
  // 여기서 유저가 가지고 있는 아이템 API 호출해서 가지고 있는 아이템들 리턴할 예정

  return (
    <>
      {/* <WoodDesk /> */}
      <ChairEdit />
    </>
  );
};

export default RoomEditContainer;
