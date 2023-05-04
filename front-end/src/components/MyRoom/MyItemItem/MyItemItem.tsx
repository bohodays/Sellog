import React from "react";
import { IItemProps } from "@/typeModels/ItemShop/iteminterfaces";
import { Chair } from "@/components/ItemShop/ItemItem/Models/Chair";
import ItemWrapper from "@/components/ItemShop/ItemWrapper/ItemWrapper";
import { SDiv } from "./styles";

const MyItemItem = ({ item }: IItemProps) => {
  return (
    <SDiv>
      <div className="item__wrapper">
        <ItemWrapper item={item}></ItemWrapper>
        <div className="item__name">{item?.name}</div>
      </div>
    </SDiv>
  );
};

export default MyItemItem;
