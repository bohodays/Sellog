import { useState, useEffect } from "react";
import { SSection } from "./styles";
import { TiChevronRightOutline, TiChevronLeftOutline } from "react-icons/ti";
import { apiGetAccumulatedRecordList } from "@/api/record";
import { IAccumulatedRecordList } from "@/typeModels/mygoals/myRecordInterfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTable } from "@fortawesome/free-solid-svg-icons";

const dummyAccumulateList = [
  {
    goal: "algo",
    number: 13,
  },
  {
    goal: "blog",
    number: 15,
  },
  {
    goal: "github",
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
  const [accumulatedList, setAccumulatedList] =
    useState<IAccumulatedRecordList | null>(null);

  useEffect(() => {
    apiGetAccumulatedRecordList()
      .then((r) => {
        // console.log(r?.data.response);

        setAccumulatedList(r?.data.response);
      })
      .catch((e) => {
        console.log(e);
      });
    // apiRefreshToken().then((r) => {
    //   console.log(r);
    //   console.log(r?.data.response.accessToken, "data");
    // });
  }, []);

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = 5;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // mouse hover시 info message
  const [showInfoMessage, setShowInfoMessage] = useState(false);
  const [showTableMessage, setShowTableMessage] = useState(false);

  const handleMouseEnter = () => {
    setShowInfoMessage(true);
  };

  const handleMouseLeave = () => {
    setShowInfoMessage(false);
  };

  const handleTableMouseEnter = () => {
    setShowTableMessage(true);
  };
  const handleTableMouseLeave = () => {
    setShowTableMessage(false);
  };

  return (
    <SSection>
      <div className="accumulate__container">
        <button
          className="info__btn"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faCircleInfo} fontSize={20} />
        </button>
        <button
          className="table__btn"
          onMouseEnter={handleTableMouseEnter}
          onMouseLeave={handleTableMouseLeave}
        >
          <FontAwesomeIcon icon={faTable} />
        </button>

        {showInfoMessage && (
          <div className="info__message">
            <p>
              셀로그가 제안하는 습관 목표를 꾸준히 실천하시면 누적 보상을 통해
              더 많은 포인트를 획득하실수 있습니다!
            </p>
            <p>
              <span>6일, 11일</span>
              째에 누적 보상이 지급됩니다. <span> 21, 66일</span> 째에는 기본
              보상의 2배를 받을 수 있습니다.
            </p>
            <p>사용자 설정 습관의 경우 누적 보상을 제공하지 않습니다.</p>
            <p>피드와 CS퀴즈는 누적 보상을 제공하지 않습니다.</p>
          </div>
        )}

        {showTableMessage && (
          <div className="table__message">
            <table>
              <tr>
                <td></td>
                <td>기본 보상</td>
                <td>누적 보상</td>
                <td>21,66일 보상</td>
              </tr>
              <tr>
                <td>Github</td>
                <td>10</td>
                <td>10</td>
                <td>20</td>
              </tr>
              <tr>
                <td>Blog</td>
                <td>20</td>
                <td>x</td>
                <td>40</td>
                <td></td>
              </tr>
              <tr>
                <td>Algorithm</td>
                <td>15</td>
                <td>10</td>
                <td>20</td>
              </tr>
              <tr>
                <td>CS Quiz</td>
                <td>5</td>
                <td>x</td>
                <td>x</td>
              </tr>
              <tr>
                <td>Feed</td>
                <td>2</td>
                <td>x</td>
                <td>x</td>
              </tr>
            </table>
          </div>
        )}

        <div className="steps__wrapper">
          <button
            className="nav right"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            <TiChevronLeftOutline size={30} />
          </button>
          <div>
            <p
              style={{
                fontFamily: "ZCOOL KuaiLe",
                fontSize: "1.8vw",
                margin: "0 2vw",
              }}
            >
              {dummyAccumulateList[activeStep].goal}
            </p>
          </div>
          <button
            className="nav left"
            onClick={handleNext}
            disabled={activeStep === 4}
          >
            <TiChevronRightOutline size={30} />
          </button>
        </div>

        <div className="number">
          {accumulatedList &&
            Number(accumulatedList[dummyAccumulateList[activeStep].goal]?.day) +
              1}
          일째 유지 중입니다
        </div>

        {/* map 돌리는 코드로 바꾸기 */}
        <div className="acc__day__wrapper">
          {accumulatedList && (
            <div
              className={
                accumulatedList[dummyAccumulateList[activeStep]?.goal]
                  ?.start === null
                  ? "null__container"
                  : "goal__container"
              }
            >
              {/* feed랑 cs 왜 안돼 */}
              {accumulatedList[dummyAccumulateList[activeStep]?.goal]?.start ===
              null ? (
                <div className="recommend">
                  {dummyAccumulateList[activeStep].goal === "cs"
                    ? "CS QUIZ는 누적 보상 제도가 적용되지 않습니다."
                    : dummyAccumulateList[activeStep].goal === "feed"
                    ? "FEED는 누적 보상 제도가 적용되지 않습니다."
                    : "추천 설정이 아니면 누적 보상 제도가 적용되지 않습니다."}
                </div>
              ) : (
                <>
                  <div className="start__div">
                    {
                      accumulatedList[dummyAccumulateList[activeStep]?.goal]
                        ?.start?.[0]
                    }
                    일
                  </div>
                  <div className="start__div">
                    {
                      accumulatedList[dummyAccumulateList[activeStep]?.goal]
                        ?.mid?.[0]
                    }
                    일
                  </div>
                  <div className="start__div">
                    {
                      accumulatedList[dummyAccumulateList[activeStep]?.goal]
                        ?.last?.[0]
                    }
                    일
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <div
          className={
            dummyAccumulateList[activeStep].goal === "cs"
              ? "acc__reward__wrapper hidden"
              : dummyAccumulateList[activeStep].goal === "feed"
              ? "acc__reward__wrapper hidden"
              : "acc__reward__wrapper"
          }
        >
          {accumulatedList && (
            <div
              className={
                accumulatedList[dummyAccumulateList[activeStep]?.goal]
                  ?.start === null
                  ? "reward__container reward__hidden"
                  : "reward__container"
              }
            >
              {
                <>
                  <div className="reward__div reward1">
                    <div className="inner_idv">
                      {
                        accumulatedList[dummyAccumulateList[activeStep]?.goal]
                          ?.start?.[1]
                      }
                    </div>
                  </div>
                  <div className="reward__div reward2">
                    <div className="inner_idv">
                      {
                        accumulatedList[dummyAccumulateList[activeStep]?.goal]
                          ?.mid?.[1]
                      }
                    </div>
                  </div>
                  <div className="reward3__div">
                    <div className="reward3">
                      {
                        accumulatedList[dummyAccumulateList[activeStep]?.goal]
                          ?.last?.[1]
                      }
                    </div>
                  </div>
                </>
              }
            </div>
          )}
        </div>
      </div>
    </SSection>
  );
};

export default Accumulate;
