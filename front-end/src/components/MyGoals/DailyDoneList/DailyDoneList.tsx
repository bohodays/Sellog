import React from "react";
import { SSection } from "./styles";
import cool from "@/assets/imgs/itemShop/cool.png";
import rainbow from "@/assets/imgs/itemShop/rainbow.png";

const DailyDoneList = () => {
  return (
    <SSection>
      <img className="cool__img" src={cool}></img>
      <h1>DailyDoneList</h1>
      <img className="rainbow__img" src={rainbow}></img>
    </SSection>
  );
};

export default DailyDoneList;
