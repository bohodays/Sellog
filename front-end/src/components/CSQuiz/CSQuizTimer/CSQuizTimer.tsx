import React, { useState, useEffect } from "react";
import { SDiv } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const CSQuizTimer = ({ activeStep, handleGoToExplanation }: any) => {
  const [timer, setTimer] = useState<number>(120);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);
    if (timer === 0) {
      clearInterval(timerInterval);
      handleGoToExplanation();
    }

    return () => clearInterval(timerInterval);
  }, [timer]);

  return (
    <SDiv timer={timer}>
      <div className="nav">
        <p>{`${activeStep + 1} / 5`}</p>
        <div className="timer__bar">
          <div className="progess">
            <FontAwesomeIcon className="timer__icon" icon={faClock} />
          </div>
        </div>
        <div className="timer__wrapper">
          <p>{timer}</p>
        </div>
      </div>
    </SDiv>
  );
};

export default CSQuizTimer;
