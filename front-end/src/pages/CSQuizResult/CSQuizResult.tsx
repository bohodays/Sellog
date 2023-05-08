import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SMain } from "./styles";
import Star from "@/assets/imgs/retro/star.png";
import SmileLarge from "@/assets/imgs/retro/smile_large.png";
import Smile from "@/assets/imgs/retro/smile.png";

const CSQuizResult = () => {
  const location = useLocation();
  const correctCount = location.state.correctCount;

  const navigate = useNavigate();
  console.log(location);

  return (
    <SMain>
      <img className="img__smileLarge" src={SmileLarge} alt="SmileLarge" />
      <img className="img__smile" src={Smile} alt="Smile" />
      <button
        className="go-to-home"
        onClick={() => {
          navigate("/main");
          window.location.reload();
        }}
      >
        HOME
      </button>
      <div className="title__wrapper">
        <img src={Star} className="img__star" alt="star" />
        <p className="title">CS QUIZ RESULT</p>
      </div>
      <p className="result">{`${correctCount} / 5`}</p>
      <div>
        <button className="restart" onClick={() => navigate("/csquiz")}>
          RESTART
        </button>
      </div>
    </SMain>
  );
};

export default CSQuizResult;
