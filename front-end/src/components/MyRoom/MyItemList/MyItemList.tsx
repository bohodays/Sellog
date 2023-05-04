import React from "react";
import MyItemItem from "../MyItemItem/MyItemItem";
import { SSection, SDiv } from "./styles";
import { TiChevronRightOutline, TiChevronLeftOutline } from "react-icons/ti";

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
    name: "wood_shelve",
    point: 300,
    category: "decoration",
  },
  {
    id: 5,
    name: "leopard_chair",
    point: 300,
    category: "furniture",
  },
  {
    id: 6,
    name: "elec_guitar",
    point: 300,
    category: "etc",
  },
];

const MyItemList = () => {
  return (
    <SSection>
      <button>
        <TiChevronLeftOutline size={40} color="white"></TiChevronLeftOutline>
      </button>
      <SDiv>
        {dummyMyItemList.map((item, index) => (
          <MyItemItem item={item} key={item.id}></MyItemItem>
        ))}
      </SDiv>
      <button>
        <TiChevronRightOutline size={40} color="white"></TiChevronRightOutline>
      </button>
    </SSection>
  );
};

export default MyItemList;
