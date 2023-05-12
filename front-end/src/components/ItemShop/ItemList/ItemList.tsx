import { useState, useEffect } from "react";
import ItemItem from "../ItemItem/ItemItem";
import { SSection, SDiv } from "./styles";
import { apiGetCategorizedItemList } from "@/api/store";
import { IItemProps, IShopItem } from "@/typeModels/ItemShop/iteminterfaces";
import ItemModal from "../ItemModal.tsx/ItemModal";
const dummyItemList = [
  {
    name: "chair",
    point: 500,
    category: "FURNITURE",
  },
  {
    name: "desk",
    point: 800,
    category: "FURNITURE",
  },
  {
    name: "computer",
    point: 5000,
    category: "ELECTRONICS",
  },
  {
    name: "mouse",
    point: 500,
    category: "ELECTRONICS",
  },
  {
    name: "flower",
    point: 300,
    category: "DECORATION",
  },
  {
    name: "flower",
    point: 300,
    category: "DECORATION",
  },
  {
    name: "flower",
    point: 300,
    category: "DECORATION",
  },
  {
    name: "flower",
    point: 300,
    category: "DECORATION",
  },
  {
    name: "flower",
    point: 300,
    category: "DECORATION",
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

interface categoryProps {
  category: string;
}

const ItemList = ({ category }: categoryProps) => {
  const [page, setPage] = useState(0); // 현재 페이지
  const [totalPage, setTotalPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState<IShopItem | null>(null);

  const [itemList, setItemList] = useState<IShopItem[] | null>(null);

  useEffect(() => {
    setPage(0);
  }, [category]);

  useEffect(() => {
    apiGetCategorizedItemList(category.toLowerCase(), page)
      .then((r) => {
        setItemList(r?.data.response.content);
        setTotalPage(r?.data.response.totalPages);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [category, page]);

  const pages = () => {
    let arr = [];
    for (let i = 0; i < totalPage; i++) {
      arr.push(
        <button
          className={i === page ? "page__btn--active" : "page__btn"}
          onClick={() => setPage(i)}
        >
          {i + 1}
        </button>
      );
    }
    return arr;
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      {isModalOpen && item && (
        <ItemModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          item={item}
        ></ItemModal>
      )}
      {itemList && (
        <SSection isEmpty={totalPage}>
          <SDiv>
            {itemList.map((item: IShopItem, index: number) => (
              <ItemItem
                shopItem={item}
                key={item.id}
                setIsModalOpen={setIsModalOpen}
                setItem={setItem}
              ></ItemItem>
            ))}
          </SDiv>
          <div className="item__pagenation--wrapper">{pages()}</div>
        </SSection>
      )}
    </>
  );
};

export default ItemList;
