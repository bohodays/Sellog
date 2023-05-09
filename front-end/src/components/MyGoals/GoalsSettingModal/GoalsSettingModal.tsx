import { useState, useEffect, useRef } from "react";
import { SDiv, SSection } from "./styles";
import { TextField } from "@mui/material";
import { IRecommendedGoals } from "@/typeModels/mygoals/myGoalInterfaces";
import { apiUpdateUsergoal } from "@/api/user";
import { useRecoilState } from "recoil";
import { userInfoState } from "@/recoil/myroom/atoms";

interface IGoalSettingModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeGoal: string;
}

const goalNameToTargetName: any = {
  github: "githubTarget",
  blog: "blogTarget",
  algorithm: "bojTarget",
  feed: "feedTarget",
  "cs quiz": "csTarget",
};

const recommendedGoals: IRecommendedGoals = {
  github: "1 일 1 커밋",
  blog: "7 일 1 포스팅",
  algorithm: "1 일 1 문제",
  feed: "1 일 1 피드",
  "cs quiz": "1 일 1 문제",
};

const GoalsSettingModal = ({
  isOpen,
  setIsOpen,
  activeGoal,
}: IGoalSettingModalProps) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  // feed, cs true false 여부
  const [doIt, setDoIt] = useState(userInfo[goalNameToTargetName[activeGoal]]);

  let day = 1;
  let cnt = 1;
  const [myGoal, setMyGoal] = useState({
    githubTarget: userInfo["githubTarget"],
    blogTarget: userInfo["blogTarget"],
    feedTarget: userInfo["feedTarget"],
    bojTarget: userInfo["bojTarget"],
    csTarget: userInfo["csTarget"],
  });

  const handleModalClose = () => {
    setIsOpen(false);
  };

  // div 눌러도 modal 꺼지는거 방지하기 위해 event 올라가는 거 막음
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleDaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    day = Number(event.target.value);
  };

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    cnt = Number(event.target.value);
  };

  // myGoal 수정 요청
  const updateMyGoal = (activeGoal: string) => {
    let data: any = {};
    if (activeGoal === "cs quiz" || activeGoal === "feed") {
      data = {
        ...myGoal,
        [goalNameToTargetName[activeGoal]]: doIt,
      };
    } else {
      data = {
        ...myGoal,
        [goalNameToTargetName[activeGoal]]: `${day}-${cnt}`,
      };
    }
    apiUpdateUsergoal(data)
      .then((r) => {
        setMyGoal(r?.data.response);
        handleModalClose();
        setUserInfo({
          ...userInfo,
          githubTarget: r?.data.response.githubTarget,
          bojTarget: r?.data.response.bojTarget,
          blogTarget: r?.data.response.blogTarget,
          feedTarget: r?.data.response.feedTarget,
          csTarget: r?.data.response.csTarget,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // feed, cs quiz setting button
  const handleOXBtn = () => {
    setDoIt((prev) => !prev);
  };

  return (
    <SSection isOpen={isOpen} onClick={handleModalClose}>
      <SDiv onClick={handleModalClick}>
        <div className="modal">
          <div>{activeGoal}</div>
          <div className="recommended__goal__wrapper">
            <h1>추천 설정</h1>
            <div>{recommendedGoals[activeGoal]}</div>
          </div>
          <div className="custom__goal__wrapper">
            <h1>사용자 설정</h1>
            {activeGoal === "feed" || activeGoal === "cs quiz" ? (
              <button onClick={handleOXBtn}>{doIt ? "O" : "X"}</button>
            ) : (
              <div>
                <TextField
                  id="custom__goal__day"
                  variant="outlined"
                  type="number"
                  sx={{
                    width: "3vw",
                    height: "3vh",
                    "& .MuiInputBase-input": { p: 0.5 },
                  }}
                  onChange={handleDaysChange}
                />
                일
                <TextField
                  id="custom__goal__cnt"
                  variant="outlined"
                  type="number"
                  sx={{
                    width: "3vw",
                    height: "3vh",
                    "& .MuiInputBase-input": { p: 0.5 },
                  }}
                  onChange={handleCountChange}
                />
                회
              </div>
            )}
          </div>
          <button
            style={{ backgroundColor: "tomato" }}
            onClick={() => updateMyGoal(activeGoal)}
          >
            완료
          </button>
        </div>
      </SDiv>
    </SSection>
  );
};

export default GoalsSettingModal;
