import { useEffect, useState } from "react";
import { SSection } from "./styles";
import blueEye from "@/assets/imgs/retro/blue_eye.png";
import MyItemList from "@/components/MyRoom/MyItemList/MyItemList";
import { apiGetMyItemList } from "@/api/room";
import { IItem } from "@/typeModels/ItemShop/iteminterfaces";

const itemCategories = [
  "all",
  "furniture",
  "electronics",
  "decoration",
  "appliance",
];

const MyItems = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentItemList, setCurrentItemList] = useState<Array<IItem>>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLast, setIsLast] = useState(false);

  const handleSelectedCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const eventTarget = e.target as HTMLElement;
    setSelectedCategory(() => eventTarget.innerText);
    setCurrentPage(0);
  };

  useEffect(() => {
    apiGetMyItemList(selectedCategory, currentPage).then((res) => {
      console.log(res);
      if (res?.data.response.last) {
        setIsLast(true);
      } else {
        setIsLast(false);
      }

      const response = res?.data.response.content;
      const totalItemList = [...response];
      let tmpItem = {
        category: "",
        id: null,
        itemId: null,
        name: "undefined",
        path: null,
        point: 0,
        roomId: 0,
        rotation: null,
        x: null,
        y: null,
        z: null,
      };

      while (totalItemList.length !== 6) {
        totalItemList.push(tmpItem);
      }
      setCurrentItemList([...totalItemList]);
    });
  }, [currentPage, selectedCategory]);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  console.log(currentItemList, "현재 아이템");

  return (
    <SSection>
      <div className="title__wrapper">
        <img className="blueeye__img" src={blueEye}></img>
        <div className="title">My Items</div>
      </div>
      <div className="categories__box">
        {itemCategories.map((item, index) =>
          item === selectedCategory ? (
            <div
              className="category__btn--wrapper selected__btn--wrapper"
              key={index}
            >
              <button
                className="category__btn selected__btn"
                onClick={handleSelectedCategory}
              >
                {item}
              </button>
            </div>
          ) : (
            <div className="category__btn--wrapper" key={index}>
              <button
                className="category__btn"
                onClick={handleSelectedCategory}
              >
                {item}
              </button>
            </div>
          )
        )}
      </div>
      <MyItemList
        isLast={isLast}
        currentItemList={currentItemList}
        currentPage={currentPage}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      ></MyItemList>
    </SSection>
  );
};

export default MyItems;
