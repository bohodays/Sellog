import { useState } from "react";
import { SSection } from "./styles";
import blueEye from "@/assets/imgs/retro/blue_eye.png";
import MyItemList from "@/components/MyRoom/MyItemList/MyItemList";

const itemCategories = [
  "all",
  "furniture",
  "electronics",
  "decoration",
  "appliance",
];

const MyItems = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleSelectedCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const eventTarget = e.target as HTMLElement;
    setSelectedCategory(() => eventTarget.innerText);
  };

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
      <MyItemList></MyItemList>
    </SSection>
  );
};

export default MyItems;
