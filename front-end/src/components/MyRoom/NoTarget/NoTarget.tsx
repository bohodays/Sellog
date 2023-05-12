import React from "react";
import { Link } from "react-router-dom";
import { SNoTarget } from "./styles";

// target setting이 되지 않은 유저에게 보이는 component
function NoTarget() {
  return (
    <SNoTarget>
      <p>Target 설정 하세요</p>
      <button className="button__goal" id="notarget__button">
        <Link to={"/mygoals"}>Set Target</Link>
      </button>
    </SNoTarget>
  );
}

export default NoTarget;
