import React from "react";
import { SSection } from "./styles";
import cool from "@/assets/imgs/itemShop/cool.png";
import rainbow from "@/assets/imgs/itemShop/rainbow.png";
import DailyDoneItem from "../DailyDoneItem/DailyDoneItem";
interface ISelectedDate {
  selectedDateProps: Date;
}
const dummyDoneList = [
  { type: "github", doneCount: 3 },
  { type: "blog", doneCount: 1 },
  { type: "csquiz", doneCount: 4 },
  { type: "algorithm", doneCount: 5 },
  { type: "feed", doneCount: 2 },
];
const DailyDoneList = ({ selectedDateProps }: ISelectedDate) => {
  return (
    <SSection>
      <div className="selected__date">
        {selectedDateProps.toLocaleDateString()}
      </div>
      <img className="cool__img" src={cool}></img>
      {dummyDoneList.map((item, index) => (
        <DailyDoneItem doneItem={item} key={index}></DailyDoneItem>
      ))}
      <img className="rainbow__img" src={rainbow}></img>
    </SSection>
  );
};

export default DailyDoneList;
