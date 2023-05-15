import React from "react";
import { SMain } from "./styles";
import CSImg from "@/assets/imgs/csquiz_img.png";
import CSBattleImg from "@/assets/imgs/csquiz_battle_img.png";
import { useNavigate } from "react-router-dom";

const CSQuizSelect = () => {
  const navigate = useNavigate();

  return (
    <SMain>
      <button
        className="go-to-home"
        onClick={() => {
          navigate("/main");
          window.location.reload();
        }}
      >
        HOME
      </button>
      <div className="check-pattern">
        <div
          className="wrapper solo-play__wrapper"
          onClick={() => {
            navigate("/csquiz-solo");
          }}
        >
          <p className="solo-play__title">SOLO</p>
          <p className="solo-play__title">PLAY</p>
          <div className="solo-play__info-wrapper">
            <img className="cs-quiz__img" src={CSImg} alt="csquiz-solo" />
            <p className="solo-play__info">
              5가지의 영역 중 하나를 선택해서 5문제를 풀어보세요.
            </p>
            <p className="solo-play__info">
              각 문제는 4지선다로 이루어져 있으며, 2분의 제한시간이 있습니다.
            </p>
          </div>
        </div>
        <div
          className="wrapper battle-play__wrapper"
          onClick={() => {
            navigate("/csquiz-matching");
          }}
        >
          <p className="battle-play__title">1 vs 1</p>
          <p className="battle-play__title">BATTLE</p>
          <div className="battle-play__info-wrapper">
            <img className="cs-quiz__img" src={CSBattleImg} alt="csquiz-solo" />
            <p className="battle-play__info">
              일대일 대결을 통해 당신의 CS 실력을 보여주세요.
            </p>
            <p className="battle-play__info">
              매칭이 이루어지면 다른 유저와 실시간 CS 퀴즈 대결이 진행됩니다.
            </p>
            <p className="battle-play__info">
              3개의 OX 퀴즈가 출제되며, 각 문제당 10초의 제한시간이 있습니다.
            </p>
          </div>
        </div>
      </div>
    </SMain>
  );
};

export default CSQuizSelect;
