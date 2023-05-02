import React from "react";
import { SSection } from "./styles";
import blueEye from "@/assets/imgs/retro/blue_eye.png";
const MyItems = () => {
  return (
    <SSection>
      <div className="title__wrapper">
        <img src={blueEye}></img>
        <div className="title">My Items</div>
      </div>
    </SSection>
  );
};

export default MyItems;
