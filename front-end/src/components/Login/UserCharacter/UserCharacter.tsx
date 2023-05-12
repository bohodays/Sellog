import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import UserCharacterWrapper from "../UserCharacterWrapper/UserCharacterWrapper";
import { TiChevronLeft, TiChevronRight } from "react-icons/ti";

type ActiveType = {
  active: number;
  handleLeftActive: () => void;
  handleRightActive: () => void;
};

const UserCharacter = ({
  active,
  handleLeftActive,
  handleRightActive,
}: ActiveType) => {
  console.log(active);

  return (
    <>
      <div className="canvas__wrapper">
        <UserCharacterWrapper active={active} />
      </div>
      <div className="button-wrapper">
        <button className="nav left" onClick={handleLeftActive}>
          <TiChevronLeft />
        </button>
        <button className="nav right" onClick={handleRightActive}>
          <TiChevronRight />
        </button>
      </div>
    </>
  );
};

export default UserCharacter;
