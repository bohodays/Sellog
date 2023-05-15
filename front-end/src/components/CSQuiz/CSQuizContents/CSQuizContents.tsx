import React, { useState } from "react";
import { SDiv, SSection } from "./styles";
import "animate.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import { csQuizState } from "@/recoil/csquiz/atoms";
import CSQuizTimer from "../CSQuizTimer/CSQuizTimer";
import { useNavigate } from "react-router-dom";

const CSQuizContents = () => {
  const [quizList, setQuizList] = useRecoilState(csQuizState);
  const [activeStep, setActiveStep] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [activeFontColor, setActiveFontColor] = useState<number | null>(null);
  const [isExplanation, setIsExplanation] = useState(false);

  const navigate = useNavigate();
  console.log(quizList);

  const handleGoToExplanation = () => {
    if (
      activeFontColor &&
      activeFontColor === Number(quizList[activeStep].answer)
    ) {
      setCorrectCount((prev) => prev + 1);
    }
    setIsExplanation(!isExplanation);
  };

  const handleGoToQuiz = () => {
    if (activeStep === 4) {
      navigate("/csquiz-result", {
        state: {
          correctCount,
        },
      });
    } else {
      setActiveStep(activeStep + 1);
      setIsExplanation(!isExplanation);
      setActiveFontColor(null);
    }
  };

  return (
    <>
      {isExplanation ? (
        <SDiv>
          <h3 className="comment">{quizList[activeStep].comment}</h3>
          <button className="submit" onClick={handleGoToQuiz}>
            {activeStep === 4 ? "결과 보기" : "다음"}
          </button>
        </SDiv>
      ) : (
        <SSection activeFontColor={activeFontColor}>
          <CSQuizTimer
            activeStep={activeStep}
            handleGoToExplanation={handleGoToExplanation}
          />
          <h3 className="quest">{quizList[activeStep].quest}</h3>
          <div className="select__wrapper">
            <div
              className="post-it item select1 animate__animated animate__fadeInLeft"
              onClick={() => {
                setActiveFontColor(1);
              }}
            >
              <div className="tape"></div>
              {quizList[activeStep].option1}
            </div>
            <div
              className="post-it item select2 animate__animated animate__fadeInDown"
              onClick={() => {
                setActiveFontColor(2);
              }}
            >
              <div className="tape"></div>
              {quizList[activeStep].option2}
            </div>
            <div
              className="post-it item select3 animate__animated animate__fadeInUp"
              onClick={() => {
                setActiveFontColor(3);
              }}
            >
              <div className="tape"></div>
              {quizList[activeStep].option3}
            </div>
            <div
              className="post-it item select4 animate__animated animate__fadeInRight"
              onClick={() => {
                setActiveFontColor(4);
              }}
            >
              <div className="tape"></div>
              {quizList[activeStep].option4}
            </div>
          </div>
          <button className="submit" onClick={handleGoToExplanation}>
            확인
          </button>
        </SSection>
      )}
    </>
  );
};

export default CSQuizContents;
