import { useState } from "react";
import { SGhostContainer, SMain, SContainer } from "./styles";
import red_ghost from "@/assets/imgs/retro/red_ghost.png";
import yellow_ghost from "@/assets/imgs/retro/yellow_ghost.png";
import ItemList from "@/components/ItemShop/ItemList/ItemList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { userInfoState } from "@/recoil/myroom/atoms";
import { useRecoilState } from "recoil";
import coin from "@/assets/imgs/retro/coin.png";

const ItemShop = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const homeNavigator = useNavigate();
  const getOutHandler = () => {
    homeNavigator("/main");
  };
  const repeatDots = () => {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(<div className="dot"></div>);
    }
    return arr;
  };

  const handleSelectedCategory = (e: React.MouseEvent<HTMLElement>) => {
    const eventTarget = e.target as HTMLElement;
    setSelectedCategory(eventTarget.innerText);
  };

  return (
    <SMain>
      <div className="sign__title--container">
        <h1 className="sign__title">ITEM SHOP</h1>
      </div>
      <SContainer>
        <div className="left__wrapper">
          <div className="item__category--container">
            <h6
              className={
                selectedCategory === "ALL"
                  ? "item__category__selected"
                  : "item__category"
              }
              onClick={handleSelectedCategory}
            >
              ALL
            </h6>
            <h6
              className={
                selectedCategory === "FURNITURE"
                  ? "item__category__selected"
                  : "item__category"
              }
              onClick={handleSelectedCategory}
            >
              FURNITURE
            </h6>
            <h6
              className={
                selectedCategory === "ELECTRONICS"
                  ? "item__category__selected"
                  : "item__category"
              }
              onClick={handleSelectedCategory}
            >
              ELECTRONICS
            </h6>
            <h6
              className={
                selectedCategory === "APPLIANCE"
                  ? "item__category__selected"
                  : "item__category"
              }
              onClick={handleSelectedCategory}
            >
              APPLIANCE
            </h6>
            <h6
              className={
                selectedCategory === "DECORATION"
                  ? "item__category__selected"
                  : "item__category"
              }
              onClick={handleSelectedCategory}
            >
              DECORATION
            </h6>
          </div>
          <div className="mycoin__box">
            <div className="mycoin__wrapper">
              <img src={coin} className="coin__icon"></img>
              {userInfo.points}
            </div>
          </div>
        </div>
        <ItemList category={selectedCategory}></ItemList>
        <FontAwesomeIcon
          icon={faRightFromBracket}
          className="goHome__button"
          onClick={getOutHandler}
        />
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
