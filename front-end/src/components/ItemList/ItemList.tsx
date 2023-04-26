import React from "react";
import ItemItem from "../ItemItem/ItemItem";
import { SSection, SDiv } from "./styles";

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
  {
    name: "flower",
    point: 300,
    category: "decoration",
  },
  {
    name: "flower",
    point: 300,
    category: "decoration",
  },
  {
    name: "flower",
    point: 300,
    category: "decoration",
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
      <SDiv>
        {dummyItemList.map((item, index) => (
          <ItemItem item={item}></ItemItem>
        ))}
      </SDiv>
      <div className="item__pagenation--wrapper">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
      </div>
    </SSection>
  );
};

export default ItemList;
