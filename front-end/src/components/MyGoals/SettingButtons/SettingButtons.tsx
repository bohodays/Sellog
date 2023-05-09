import { useState, useRef } from "react";
import { SArticle } from "./styles";
import GoalsSettingModal from "../GoalsSettingModal/GoalsSettingModal";

interface IModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveGoal: React.Dispatch<React.SetStateAction<string>>;
}

const SettingButtons = ({ setIsOpen, setActiveGoal }: IModalProps) => {
  const handleModalOpen = (goal: string) => {
    setIsOpen((prev) => !prev);
    setActiveGoal(goal);
  };

  return (
    <SArticle>
      <button onClick={() => handleModalOpen("github")}>
        <p className="item1 purple">github</p>
        <p className="item2">1 일 1 commit</p>
      </button>
      <button onClick={() => handleModalOpen("blog")}>
        <p className="item1 red">blog</p>
        <p className="item2">목표를 설정해주세요.</p>
      </button>
      <button onClick={() => handleModalOpen("algorithm")}>
        <p className="item1 yellow">algorithm</p>
        <p className="item2">목표를 설정해주세요.</p>
      </button>
      <button onClick={() => handleModalOpen("feed")}>
        <p className="item1 blue">feed</p>
        <p className="item2">목표를 설정해주세요.</p>
      </button>
      <button onClick={() => handleModalOpen("cs quiz")}>
        <p className="item1 green">cs quiz</p>
        <p className="item2">목표를 설정해주세요.</p>
      </button>
    </SArticle>
  );
};

export default SettingButtons;
