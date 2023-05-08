import React from "react";
import { SDiv, SSection } from "./styles";
import { TextField } from "@mui/material";

interface IModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeGoal: string;
}

const GoalsSettingModal = ({ isOpen, setIsOpen, activeGoal }: IModalProps) => {
  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <SSection isOpen={isOpen} onClick={handleModalClose}>
      <SDiv onClick={handleModalClick}>
        <div className="modal">
          <div>{activeGoal}</div>
          <h1>추천 설정</h1>

          <div>
            <h1>사용자 설정</h1>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="number"
              sx={{
                width: "3vw",
                height: "3vh",
                "& .MuiInputBase-input": { p: 0.5 },
              }}
            />
          </div>
        </div>
      </SDiv>
    </SSection>
  );
};

export default GoalsSettingModal;
