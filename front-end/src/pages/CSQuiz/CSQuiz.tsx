import React, { useState } from "react";
import { SMain } from "./styles";
import SmileComputer from "../../assets/imgs/retro/smile_computer.png";
import Smile from "../../assets/imgs/retro/smile.png";
import { TiChevronRightOutline, TiChevronLeftOutline } from "react-icons/ti";
import MobileStepper from "@mui/material/MobileStepper";
import { Button } from "@mui/material";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { apiGetQuizList } from "@/api/csQuiz";
import { useRecoilState } from "recoil";
import { csQuizState } from "@/recoil/csquiz/atoms";

const steps = [
  "Data Structure",
  "Operating System",
  "Database",
  "Network ",
  "Programming Common",
];

const CSQuiz = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [quizList, setQuizList] = useRecoilState(csQuizState);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // activeStep을 입력하면 api 요청을 보낼 한글 카테고리로 변환하는 함수
  const activeStepToCategory = (activeStep: number): string => {
    if (activeStep === 0) return " 자료구조";
    else if (activeStep === 1) return "운영체제";
    else if (activeStep === 2) return "데이터베이스";
    else if (activeStep === 3) return "네트워크";
    else return "프로그래밍 공통";
  };

  const handleGetQuizList = () => {
    const category = activeStepToCategory(activeStep);
    apiGetQuizList(category).then((res) => {
      setQuizList(res?.data.response);
      navigate("/csquiz-progress");
    });
  };

  return (
    <SMain activeStep={activeStep}>
      <button
        className="go-to-home"
        onClick={() => {
          navigate("/main");
          window.location.reload();
        }}
      >
        HOME
      </button>
      <div className="main__info">
        <div className="check-pattern">
          <img className="sticker1" src={SmileComputer} alt="스마일이미지1" />
          <p>CS</p>
          <p>QUIZ</p>
          <img className="sticker2" src={Smile} alt="스마일이미지2" />
        </div>
      </div>
      <div className="quiz__select">
        <div className="steps__wrapper">
          <button
            className="nav right"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            <TiChevronLeftOutline className="rigth__icon" />
          </button>
          <h1 className="steps">{steps[activeStep]}</h1>
          <button
            className="nav left"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            <TiChevronRightOutline className="left__icon" />
          </button>
        </div>
        <div></div>
        <button className="button__select" onClick={handleGetQuizList}>
          SELECT
        </button>
      </div>
    </SMain>
  );
};

export default CSQuiz;
