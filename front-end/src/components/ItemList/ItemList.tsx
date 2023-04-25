import React from "react";
import ItemItem from "../ItemItem/ItemItem";
import { SSection } from "./styles";

const dummyItemList = [
  {
    name: "chair",
    point: 500,
    category: "furniture",
  },
  {
    name: "desk",
    point: 800,
    category: "furniture",
  },
  {
    name: "computer",
    point: 5000,
    category: "electronics",
  },
  {
    name: "flower",
    point: 300,
    category: "decoration",
  },
];

const ItemList = () => {
  return (
    <SSection>
      {dummyItemList.map((item, index) => (
        <ItemItem item={item}></ItemItem>
      ))}
    </SSection>
  );
};

export default ItemList;
