import { useState, useEffect } from "react";
import ItemItem from "../ItemItem/ItemItem";
import { SSection, SDiv } from "./styles";
import { apiGetCategorizedItemList } from "@/api/store";
import { IItem } from "@/typeModels/ItemShop/itemInterfaces";

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

  const [itemList, setItemList] = useState<IItem[] | null>(null);

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
  return (
    <>
      {itemList && (
        <SSection isEmpty={totalPage}>
          <SDiv>
            {itemList.map((item: any, index: number) => (
              <ItemItem item={item} key={item.id}></ItemItem>
            ))}
          </SDiv>
          <div className="item__pagenation--wrapper">{pages()}</div>
        </SSection>
      )}
    </>
  );
};

export default ItemList;
