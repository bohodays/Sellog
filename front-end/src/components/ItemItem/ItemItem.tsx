import React from "react";
import { SArticle } from "./styles";
import { Item } from "@/typeModels/ItemShop/ItemInterfaces";
import item_sample from "@/assets/imgs/retro/item_sample.png";

interface ItemProps {
  item: Item;
}

const ItemItem = ({ item }: ItemProps) => {
  return (
    <SArticle>
      <img src={item_sample} className="item__img"></img>
      <div>{item.name}</div>
      <div>
        {item.point}
        {item.category}
      </div>
    </SArticle>
  );
};

export default ItemItem;
