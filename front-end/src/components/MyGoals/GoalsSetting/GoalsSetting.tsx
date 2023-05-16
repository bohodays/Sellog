import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SSection } from "./styles";
import RetroPencil from "@/assets/imgs/retro/pencil_retro.png";
import WorkHard from "@/assets/imgs/retro/work_hard.png";
import SettingButtons from "../SettingButtons/SettingButtons";
import Spring from "@/assets/imgs/retro/spring.png";
import RetroImg from "@/assets/imgs/retro/retro_img.png";
import YellowFlower from "@/assets/imgs/retro/yellow_flower.png";
import SmileAndLight from "@/assets/imgs/retro/smile_and_light.png";
import GoalsSettingModal from "../GoalsSettingModal/GoalsSettingModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const GoalsSetting: any = () => {
  const myRoomNavigator = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeGoal, setActiveGoal] = useState<string>("github");
  const toMyRoomHandler = () => {
    myRoomNavigator("/myroom");
  };

  // mouse hover시 info message
  const [showInfoMessage, setShowInfoMessage] = useState(false);

  const handleMouseEnter = () => {
    setShowInfoMessage(true);
  };

  const handleMouseLeave = () => {
    setShowInfoMessage(false);
  };

  return (
    <SSection isOpen={isOpen}>
      {isOpen && (
        <GoalsSettingModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          activeGoal={activeGoal}
        ></GoalsSettingModal>
      )}
      <div className="title__wrapper">
        {/* <button
          className="info__btn"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faCircleInfo} fontSize={20} />
        </button> */}

        <p className="title">MY GOALS</p>
        <span style={{ textShadow: "1px 2px gray" }}>
          keep running to achieve your goal !
        </span>
        <img
          className="sticker retro__pencil"
          src={RetroPencil}
          alt="retro_pencil"
        />
        <img className="sticker retro__work" src={WorkHard} alt="work_hard" />
      </div>
      <div className="content__wrapper">
        <img className="sticker retro__spring" src={Spring} alt="spring" />
        {/* <img className="sticker retro__img" src={RetroImg} alt="retro" /> */}
        {/* 목표 설정 버튼들 */}
        {/* <FontAwesomeIcon
          icon={faArrowLeft}
          className="goback__button"
          onClick={toMyRoomHandler}
        /> */}
        <button
          className="info__btn"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faCircleInfo} fontSize={20} />
        </button>
        {showInfoMessage && (
          <div className="info__message">목표 설정과 보상 체계 안내</div>
        )}
        <SettingButtons setIsOpen={setIsOpen} setActiveGoal={setActiveGoal} />
        <img
          className="sticker retro__yellow-flower"
          src={YellowFlower}
          alt="yellow_flower"
        />
        <img
          className="sticker retro__smile-light"
          src={SmileAndLight}
          alt="smile_and_light"
        />
      </div>
    </SSection>
  );
};

export default GoalsSetting;
