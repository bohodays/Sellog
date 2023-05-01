import { useState } from "react";
import { SGhostContainer, SMain, SContainer } from "./styles";
import red_ghost from "@/assets/imgs/retro/red_ghost.png";
import yellow_ghost from "@/assets/imgs/retro/yellow_ghost.png";
import { Link } from "react-router-dom";
import ItemList from "@/components/ItemShop/ItemList/ItemList";

const ItemShop = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const repeatDots = () => {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(<div className="dot"></div>);
    }
    return arr;
  };

  const handleCategory = (e: React.MouseEvent<HTMLElement>) => {
    const eventTarget = e.target as HTMLElement;
    setSelectedCategory(eventTarget.innerText);
  };

  return (
    <SMain>
      <div className="sign__title--container">
        <h1 className="sign__title">ITEM SHOP</h1>
      </div>
      <SContainer>
        <div className="item__category--container">
          <h6 className="item__category" onClick={handleCategory}>
            ALL
          </h6>
          <h6 className="item__category" onClick={handleCategory}>
            FURNITURE
          </h6>
          <h6 className="item__category" onClick={handleCategory}>
            ELECTRONICS
          </h6>
          <h6 className="item__category" onClick={handleCategory}>
            DECORATION
          </h6>
          <h6 className="item__category" onClick={handleCategory}>
            ETC
          </h6>
        </div>
        {/* <div> */}
        <ItemList category={selectedCategory}></ItemList>
        {/* </div> */}
      </SContainer>
      <SGhostContainer position={"top"}>
        {repeatDots()}
        <img src={yellow_ghost} className="yellow__ghost"></img>
      </SGhostContainer>
      <SGhostContainer position={"bottom"}>
        <img src={red_ghost} className="red__ghost"></img>
        {repeatDots()}
      </SGhostContainer>
    </SMain>
  );
};

export default ItemShop;
