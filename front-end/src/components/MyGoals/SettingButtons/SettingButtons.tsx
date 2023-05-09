import { useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { SArticle } from "./styles";
import GoalsSettingModal from "../GoalsSettingModal/GoalsSettingModal";
import { userInfoState } from "@/recoil/myroom/atoms";

interface IModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveGoal: React.Dispatch<React.SetStateAction<string>>;
}

const SettingButtons = ({ setIsOpen, setActiveGoal }: IModalProps) => {
  const handleModalOpen = (goal: string) => {
    setIsOpen((prev) => !prev);
    setActiveGoal(goal);
  };

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  console.log(userInfo);

  return (
    <SArticle>
      <button onClick={() => handleModalOpen("github")}>
        <p className="item1 purple">github</p>
        <p className="item2">
          {userInfo["githubTarget"] ? (
            <div>
              {`${userInfo["githubTarget"][0]} 일 ${userInfo["githubTarget"][2]} 커밋`}
            </div>
          ) : (
            "목표를 설정해주세요."
          )}
        </p>
      </button>
      <button onClick={() => handleModalOpen("blog")}>
        <p className="item1 red">blog</p>
        <p className="item2">
          {userInfo["blogTarget"] ? (
            <div>
              {`${userInfo["blogTarget"][0]} 일 ${userInfo["blogTarget"][2]} 포스팅`}
            </div>
          ) : (
            "목표를 설정해주세요."
          )}
        </p>
      </button>
      <button onClick={() => handleModalOpen("algorithm")}>
        <p className="item1 yellow">algorithm</p>
        <p className="item2">
          {userInfo["bojTarget"] ? (
            <div>
              {`${userInfo["bojTarget"][0]} 일 ${userInfo["bojTarget"][2]} 문제`}
            </div>
          ) : (
            "목표를 설정해주세요."
          )}
        </p>
      </button>
      <button onClick={() => handleModalOpen("feed")}>
        <p className="item1 blue">feed</p>
        <p className="item2">{userInfo["feedTarget"] ? "1 일 1 피드" : "X"}</p>
      </button>
      <button onClick={() => handleModalOpen("cs quiz")}>
        <p className="item1 green">cs quiz</p>
        <p className="item2">{userInfo["csTarget"] ? "1 일 1 문제" : "X"}</p>
      </button>
    </SArticle>
  );
};

export default SettingButtons;
