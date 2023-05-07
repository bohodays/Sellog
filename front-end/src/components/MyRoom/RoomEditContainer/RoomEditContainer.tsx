import React, { useState } from "react";
import { ChairEdit } from "../RoomEditItems/Models/ChairEdit";
import { WoodDeskEdit } from "../RoomEditItems/Models/WoodDeskEdit";

// type PropsType = {
//   isDragging: boolean;
//   setIsDragging: any;
// };

const RoomEditContainer = ({
  // target,
  // setTarget,
  editButtonRef,
  rotationButtonRef,
}: any) => {
  // 여기서 유저가 가지고 있는 아이템 API 호출해서 가지고 있는 아이템들 리턴할 예정

  return (
    <>
      <WoodDeskEdit
        // target={target}
        // setTarget={setTarget}
        editButtonRef={editButtonRef}
        rotationButtonRef={rotationButtonRef}
      />
      <ChairEdit
        // target={target}
        // setTarget={setTarget}
        editButtonRef={editButtonRef}
        rotationButtonRef={rotationButtonRef}
      />
    </>
  );
};

export default RoomEditContainer;
