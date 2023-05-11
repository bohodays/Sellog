import { useEffect, useState } from "react";
import { SArticle } from "./styles";
import item_sample from "@/assets/imgs/retro/item_sample.png";
import coin from "@/assets/imgs/retro/coin.png";
import ItemWrapper from "../ItemWrapper/ItemWrapper";
import { IItemProps } from "@/typeModels/ItemShop/itemInterfaces";
import { apiBuyItem } from "@/api/store";
import { userInfoState } from "@/recoil/myroom/atoms";
import { useRecoilState } from "recoil";
const ItemItem = ({ item }: IItemProps) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [mypoint, setMypoint] = useState(userInfo.points);

  const buyItem = () => {
    apiBuyItem(item?.id)
      .then((r) => {
        setMypoint(r?.data.response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <SArticle>
      <img src={item.path} className="item__img"></img>
      {/* <ItemWrapper /> */}
      <div className="item__description__wrapper">
        <div className="item__name">{item?.name}</div>
        <div className="item__description">
          <div className="coin__wrapper">
            <img src={coin} className="coin"></img>
            {item?.point}
          </div>
          {/* {item.category} */}

          <button className="buy__btn" onClick={buyItem}>
            Buy
          </button>
        </div>
      </div>
    </SArticle>
  );
};

export default ItemItem;
