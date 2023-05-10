import React, { useState } from "react";
import { IItemProps } from "@/typeModels/ItemShop/itemInterfaces";
import ItemWrapper from "@/components/ItemShop/ItemWrapper/ItemWrapper";
import { SDiv } from "./styles";
import { useRecoilState } from "recoil";
import { myItemsState } from "@/recoil/myroom/atoms";
import { itemDefaultInfo } from "@/utils/itemDefaultInfo";

const MyItemItem = ({ item }: IItemProps) => {
  const [myItems, setMyItems] = useRecoilState(myItemsState);

  const handleViewItem = () => {
    let targetIndex;

    const targetItem = myItems.filter((getItem, i) => {
      if (getItem.itemId === item?.itemId) {
        targetIndex = i;
        return getItem.itemId === item?.itemId;
      }
    });
    const itemPositionY = itemDefaultInfo(item?.itemId);

    const viewItem = {
      ...targetItem[0],
      x: 0,
      y: itemPositionY,
      z: 0,
      rotation: 0,
    };

    const copyMyItems = [...myItems];

    if (targetIndex !== undefined) copyMyItems[targetIndex] = viewItem;

    setMyItems(copyMyItems);
  };

  return (
    <SDiv>
      <div className="item__wrapper" onClick={handleViewItem}>
        {/* <ItemWrapper item={item}></ItemWrapper> */}
        {item?.path ? (
          <img className="item__img" src={item?.path} alt="" />
        ) : (
          <div style={{ width: "14vw", height: "32vh" }}></div>
        )}

        <div
          className={
            item?.name === "undefined" ? "item__name name-hidden" : "item__name"
          }
        >
          {item?.name}
        </div>
      </div>
    </SDiv>
  );
};

export default React.memo(MyItemItem);
