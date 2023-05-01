import { useState, useEffect } from "react";
import ItemItem from "../ItemItem/ItemItem";
import { SSection, SDiv } from "./styles";

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

  useEffect(() => {
    setPage(1);
  }, [category]);

  const selectedItemList = dummyItemList.filter((item, index) =>
    category === "ALL" ? item : item.category === category
  );

  const pages = () => {
    let arr = [];
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
    return arr;
  };
  return (
    <SSection isEmpty={selectedItemList.length}>
      <SDiv>
        {dummyItemList
          .filter((item, index) =>
            category === "ALL" ? item : item.category === category
          )
          .slice(startIndex, endIndex)
          .map((item, index) => (
            <ItemItem item={item} key={`${index}`}></ItemItem>
          ))}
      </SDiv>
      <div className="item__pagenation--wrapper">{pages()}</div>
    </SSection>
  );
};

export default ItemList;
