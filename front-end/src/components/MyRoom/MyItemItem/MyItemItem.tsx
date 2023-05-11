import React, { useState } from "react";
import { IItemProps } from "@/typeModels/ItemShop/itemInterfaces";
import ItemWrapper from "@/components/ItemShop/ItemWrapper/ItemWrapper";
import { SDiv } from "./styles";
import { useRecoilState } from "recoil";
import { myItemsState } from "@/recoil/myroom/atoms";
import { itemDefaultInfo } from "@/utils/itemDefaultInfo";

const MyItemItem = ({ myItem }: IItemProps) => {
  const [myItems, setMyItems] = useRecoilState(myItemsState);

  const handleViewItem = () => {
    let targetIndex;

    const targetItem = myItems.filter((getItem, i) => {
      if (getItem.itemId === myItem?.itemId) {
        targetIndex = i;
        return getItem.itemId === myItem?.itemId;
      }
    });
    const itemPositionY = itemDefaultInfo(myItem?.itemId);

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
        {myItem?.path ? (
          <img className="item__img" src={myItem?.path} alt="" />
        ) : (
          <div style={{ width: "14vw", height: "32vh" }}></div>
        )}

        <div
          className={
            myItem?.name === "undefined"
              ? "item__name name-hidden"
              : "item__name"
          }
        >
          {myItem?.name}
        </div>
      </div>
    </SDiv>
  );
};

export default React.memo(MyItemItem);
