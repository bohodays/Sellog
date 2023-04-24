import React from "react";
import NotFoundBackground from "../../assets/imgs/retro/404NotFound.png";
import { SMain } from "./styles";

const NotFound = () => {
  return (
    <SMain
      style={{
        background: `url(${NotFoundBackground}) no-repeat center center fixed`,
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
      }}
    >
      <h1 className="top">Oops!</h1>
      <div className="error__wrapper">
        <div className="error">
          <span>404</span>
        </div>
      </div>
      <h1 className="bottom">We can't find that page.</h1>
    </SMain>
  );
};

export default NotFound;
