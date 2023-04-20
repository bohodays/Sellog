import React, { useState } from "react";
import { SMain } from "./styles";
import SmileComputer from "../../assets/imgs/retro/smile_computer.png";
import Smile from "../../assets/imgs/retro/smile.png";
import { TiChevronRightOutline, TiChevronLeftOutline } from "react-icons/ti";
import MobileStepper from "@mui/material/MobileStepper";
import { Button } from "@mui/material";
import { KeyboardArrowLeft } from "@mui/icons-material";

const steps = [
  "Computer Architecture",
  "Data Structure",
  "Operating System",
  "Database",
  "Network ",
  "Software Engineering",
];

const CSQuiz = () => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    console.log("right");
    console.log(activeStep);

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <SMain>
      <button className="go-to-home">HOME</button>
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
            <TiChevronLeftOutline />
          </button>
          <h1 className="steps">{steps[activeStep]}</h1>
          <button
            className="nav left"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            <TiChevronRightOutline />
          </button>
        </div>
        <div></div>
        <button className="button__select">SELECT</button>
      </div>
    </SMain>
  );
};

export default CSQuiz;
