import React, { useState } from "react";
import { SNav } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ToggleButton = () => {
  const [toggleOnOff, setToggleOnOff] = useState(false);
  const navigate = useNavigate();

  // 토글 핸들러 함수
  const handleToggleOnOff = () => {
    setToggleOnOff(!toggleOnOff);
  };

  return (
    <SNav>
      <input
        type="checkbox"
        className="menu-open"
        name="menu-open"
        id="menu-open"
        onClick={handleToggleOnOff}
      />
      <label className="menu-open-button" htmlFor="menu-open">
        {toggleOnOff ? (
          <FontAwesomeIcon className="lines" icon={faXmark} />
        ) : (
          <FontAwesomeIcon className="lines" icon={faBars} />
        )}
      </label>

      <button
        className="menu-item gardenList"
        onClick={() => navigate("/myroom")}
      >
        ROOM
      </button>
      <button
        className="menu-item gardenList"
        onClick={() => navigate("/item-shop")}
      >
        SHOP
      </button>
      <button
        className="menu-item gardenList"
        onClick={() => navigate("/csquiz")}
      >
        CS
      </button>
      <button
        className="menu-item gardenList"
        onClick={() => navigate("/feed")}
      >
        FEED
      </button>
    </SNav>
  );
};

export default ToggleButton;
