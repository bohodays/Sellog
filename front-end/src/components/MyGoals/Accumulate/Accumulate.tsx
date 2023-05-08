import { useState } from "react";
import { SSection } from "./styles";
import { presetsObj } from "@react-three/drei/helpers/environment-assets";
import { TiChevronRightOutline, TiChevronLeftOutline } from "react-icons/ti";

const dummyAccumulateList = [
  {
    goal: "github",
    number: 13,
  },
  {
    goal: "blog",
    number: 15,
  },
  {
    goal: "algo",
    number: 20,
  },
  {
    goal: "feed",
    number: 25,
  },
  {
    goal: "cs",
    number: 13,
  },
];

const Accumulate = () => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = 5;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <SSection>
      <div className="accumulate__container">
        <div className="steps__wrapper">
          <button
            className="nav right"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            <TiChevronLeftOutline size={40} />
          </button>
          <div>
            <img
              className="goal_logo"
              src={`./src/assets/imgs/${dummyAccumulateList[activeStep].goal}_logo.png`}
              alt="logo"
            ></img>
          </div>
          <button
            className="nav left"
            onClick={handleNext}
            disabled={activeStep === 4}
          >
            <TiChevronRightOutline size={40} />
          </button>
        </div>
        <div style={{ fontFamily: "ZCOOL KuaiLe" }}>
          {dummyAccumulateList[activeStep].goal}
        </div>
        <div className="number">
          {dummyAccumulateList[activeStep].number}일째 유지 중입니다
        </div>
      </div>
    </SSection>
  );
};

export default Accumulate;
