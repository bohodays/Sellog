import React from "react";
import { SDiv, SSection } from "./styles";
import ItemWrapper from "../ItemWrapper/ItemWrapper";
import { IShopItem } from "@/typeModels/ItemShop/iteminterfaces";

export interface IModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item?: IShopItem;
}

const ItemModal = ({ isModalOpen, setIsModalOpen, item }: IModalProps) => {
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <SSection onClick={handleModalClose}>
      <SDiv onClick={handleModalClick}>
        <ItemWrapper shopItem={item}></ItemWrapper>
      </SDiv>
    </SSection>
  );
};

export default ItemModal;
