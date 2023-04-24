import React from "react";
import { SGhostContainer, SMain } from "./styles";
import red_ghost from "@/assets/imgs/retro/red_ghost.png";
import yellow_ghost from "@/assets/imgs/retro/yellow_ghost.png";

const ItemShop = () => {
  const repeatDots = () => {
    let arr = [];
    for (let i = 0; i < 12; i++) {
      arr.push(<div className="dot"></div>);
    }
    return arr;
  };

  return (
    <SMain>
      <h1 className="item__category-container">
        <h6 className="item__category">furniture</h6>
        <h6 className="item__category">furniture</h6>
        <h6 className="item__category">furniture</h6>
        <h6 className="item__category">furniture</h6>
        <h6 className="item__category">furniture</h6>
      </h1>
      <SGhostContainer position={"top"}>
        {repeatDots()}
        <img src={yellow_ghost} className="yellow__ghost"></img>
      </SGhostContainer>
      <SGhostContainer position={"bottom"}>
        <img src={red_ghost} className="red__ghost"></img>
        {repeatDots()}
      </SGhostContainer>
    </SMain>
  );
};

export default ItemShop;
