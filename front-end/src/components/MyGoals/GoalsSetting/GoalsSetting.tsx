import React from "react";
import { SSection } from "./styles";
import RetroPencil from "@/assets/imgs/retro/pencil_retro.png";
import WorkHard from "@/assets/imgs/retro/work_hard.png";
import SettingButtons from "../SettingButtons/SettingButtons";
import Spring from "@/assets/imgs/retro/spring.png";

const GoalsSetting = () => {
  return (
    <SSection>
      <div className="title__wrapper">
        <p className="title">MY GOALS</p>
        <span>kepp running to achieve your goal !</span>
        <img
          className="sticker retro__pencil"
          src={RetroPencil}
          alt="retro_pencil"
        />
        <img className="sticker retro__work" src={WorkHard} alt="work_hard" />
      </div>
      <div className="content__wrapper">
        <img className="sticker retro__spring" src={Spring} alt="spring" />
        {/* 목표 설정 버튼들 */}
        <SettingButtons />
      </div>
    </SSection>
  );
};

export default GoalsSetting;
