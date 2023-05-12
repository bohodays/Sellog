import React, { useEffect, useState } from "react";
import MyItemItem from "../MyItemItem/MyItemItem";
import { SSection, SDiv } from "./styles";
import { TiChevronRightOutline, TiChevronLeftOutline } from "react-icons/ti";
import { apiGetMyItemList } from "@/api/room";
import { myItemsType } from "@/recoil/myroom/atoms";
import { IItem } from "@/typeModels/ItemShop/iteminterfaces";

type PropsType = {
  currentItemList: Array<IItem>;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  currentPage: number;
  isLast: boolean;
};

const MyItemList = ({
  isLast,
  currentItemList,
  handlePrevPage,
  handleNextPage,
  currentPage,
}: PropsType) => {
  return (
    <SSection>
      <button
        className="prev__page"
        onClick={handlePrevPage}
        disabled={currentPage === 0 ? true : false}
      >
        <TiChevronLeftOutline size={40} color="white"></TiChevronLeftOutline>
      </button>
      <SDiv>
        {currentItemList.length &&
          currentItemList.map((item, index) => (
            <MyItemItem item={item} key={index}></MyItemItem>
          ))}
      </SDiv>
      <button
        className="next__page"
        onClick={handleNextPage}
        disabled={isLast ? true : false}
      >
        <TiChevronRightOutline size={40} color="white"></TiChevronRightOutline>
      </button>
    </SSection>
  );
};

export default MyItemList;
