import { useEffect, useState } from "react";
import { SArticle } from "./styles";
import item_sample from "@/assets/imgs/retro/item_sample.png";
import coin from "@/assets/imgs/retro/coin.png";
import {
  IShopItem,
  IShopItemProps,
} from "@/typeModels/ItemShop/iteminterfaces";
import { apiBuyItem } from "@/api/store";
import { userInfoState } from "@/recoil/myroom/atoms";
import { useRecoilState } from "recoil";
import ItemWrapper from "../ItemWrapper/ItemWrapper";
import ItemModal from "../ItemModal.tsx/ItemModal";
import { IModalProps } from "../ItemModal.tsx/ItemModal";

interface IItemModalProps {
  shopItem: IShopItem;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setItem: React.Dispatch<React.SetStateAction<IShopItem | null>>;
}
const ItemItem = ({ shopItem, setIsModalOpen, setItem }: IItemModalProps) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [mypoint, setMypoint] = useState(userInfo.points);
  const [possession, setPossession] = useState(shopItem.possession);

  // 이미 갖고 있는 아이템 possession 검사해서 못사게 하는거 추가
  const buyItem = () => {
    apiBuyItem(shopItem?.id)
      .then((r) => {
        setMypoint(r?.data.response);
        setPossession(1);
        alert(
          `구입이 완료 되었습니다. 내 포인트: ${mypoint} => ${r?.data.response}`
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setItem(shopItem);
  };
  return (
    <SArticle>
      {/* {isModalOpen && <ItemModal></ItemModal>} */}
      <img
        src={shopItem.path}
        className="item__img"
        onClick={handleOpenModal}
      ></img>
      {/* <ItemWrapper shopItem={shopItem} /> */}

      <div className="item__description__wrapper">
        <div className="item__name">{shopItem?.name?.split("_").join(" ")}</div>
        <div className="item__description">
          <div className="coin__wrapper">
            <img src={coin} className="coin"></img>
            {shopItem?.point}
          </div>
          {/* {item.category} */}
          {possession}
          <button className="buy__btn" onClick={buyItem}>
            Buy
          </button>
        </div>
      </div>
    </SArticle>
  );
};

export default ItemItem;
