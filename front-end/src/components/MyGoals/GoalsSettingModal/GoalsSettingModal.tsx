import { useState } from "react";
import { SDiv, SSection } from "./styles";
import { TextField } from "@mui/material";
import {
  IRecommendedGoals,
  IUserGoalSetting,
} from "@/typeModels/mygoals/myGoalInterfaces";
import { apiUpdateUsergoal } from "@/api/user";
import { useRecoilState } from "recoil";
import { myGoalState } from "@/recoil/mygoals/atoms";

interface IModalProps {
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
  github: "1일 1커밋",
  blog: "7일 1포스팅",
  algorithm: "1일 1문제",
  feed: "1일 1피드",
  "cs quiz": "1일 1문제",
};

const GoalsSettingModal = ({ isOpen, setIsOpen, activeGoal }: IModalProps) => {
  const [day, setDay] = useState(1);
  const [cnt, setCnt] = useState(1);
  const [myGoal, setMyGoal] = useRecoilState(myGoalState);

  // const [data, setData] = useState<IUserGoalSetting>({
  //   bojTarget: "1-1",
  //   blogTarget: "7-1",
  //   feedTarget: true,
  //   githubTarget: "1-1",
  //   csTarget: true,
  // });

  const handleModalClose = () => {
    setIsOpen(false);
  };

  // div 눌러도 modal 꺼지는거 방지하기 위해 event 올라가는 거 막음
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleDaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("day", event.target.value);
    console.log("day", Number(event.target.value));
    setDay(Number(event.target.value));
    setMyGoal({
      ...myGoal,
      [goalNameToTargetName[activeGoal]]: `${Number(
        event.target.value
      )}-${cnt}`,
    });
  };

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("cnt", event.target.value);

    setCnt(Number(event.target.value));
    setMyGoal({
      ...myGoal,
      [goalNameToTargetName[activeGoal]]: `${day}-${Number(
        event.target.value
      )}`,
    });
  };

  const updateMyGoal = () => {
    apiUpdateUsergoal(myGoal)
      .then((r) => {
        console.log("답", r);
        setMyGoal(r?.data.response);
        handleModalClose();
      })
      // .then(() => {
      //   console.log("recoil", myGoal);
      // })
      .catch((e) => {
        console.log(e);
      });
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
          <button style={{ backgroundColor: "tomato" }} onClick={updateMyGoal}>
            완료
          </button>
        </div>
      </SDiv>
    </SSection>
  );
};

export default GoalsSettingModal;
