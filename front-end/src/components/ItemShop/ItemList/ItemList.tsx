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
  // dummyData filter해서 page 정하려고 임시로 만듦
  const [page, setPage] = useState(1); // 현재 페이지
  const perPage = 8; // 페이지당 보여줄 카드의 개수
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  const [itemList, setItemList] = useState<IItem[] | null>(null);

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    apiGetCategorizedItemList("furniture", 2)
      .then((r) => {
        console.log(page, r?.data.response);
        console.log("응답", page, r);
        setItemList(r?.data.response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const selectedItemList = itemList?.filter((item, index) =>
    category === "ALL" ? item : item.category === category
  );

  const pages = () => {
    let arr = [];
    if (selectedItemList != undefined) {
      for (let i = 1; i < selectedItemList.length / perPage + 1; i++) {
        arr.push(
          <button
            className={i === page ? "page__btn--active" : "page__btn"}
            onClick={() => setPage(i)}
          >
            {i}
          </button>
        );
      }
    }
    return arr;
  };
  return (
    <>
      {itemList && selectedItemList && (
        <SSection isEmpty={selectedItemList?.length}>
          <SDiv>
            {itemList
              .filter((item, index) =>
                category === "ALL" ? item : item.category === category
              )
              .slice(startIndex, endIndex)
              .map((item, index) => (
                <ItemItem item={item} key={`${item.name}+${index}`}></ItemItem>
              ))}
          </SDiv>
          <div className="item__pagenation--wrapper">{pages()}</div>
        </SSection>
      )}
    </>
  );
};

export default ItemList;
