import React, { useState, useEffect } from "react";
import { SDiv } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const CSQuizTimer = () => {
  const [timer, setTimer] = useState<number>(120);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <SDiv timer={timer}>
      <div className="nav">
        <p>1 / 5</p>
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
