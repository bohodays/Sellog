import React from "react";
import MyItemItem from "../MyItemItem/MyItemItem";
import { SSection } from "./styles";

const dummyMyItemList = [
  {
    id: 1,
    name: "chair",
    point: 300,
    category: "furniture",
  },
  {
    id: 2,
    name: "bed",
    point: 300,
    category: "furniture",
  },
  {
    id: 3,
    name: "desk",
    point: 300,
    category: "electronics",
  },
  {
    id: 4,
    name: "clock",
    point: 300,
    category: "decoration",
  },
  {
    id: 5,
    name: "clock",
    point: 300,
    category: "decoration",
  },
  {
    id: 6,
    name: "clock",
    point: 300,
    category: "decoration",
  },
];

const MyItemList = () => {
  return (
    <SSection>
      {dummyMyItemList.map((item, index) => (
        <MyItemItem item={item} key={item.id}></MyItemItem>
      ))}
    </SSection>
  );
};

export default MyItemList;
