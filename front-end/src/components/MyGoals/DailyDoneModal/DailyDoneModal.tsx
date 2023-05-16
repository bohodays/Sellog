import { useRef, useEffect } from "react";
import { SDiv, SSection } from "./styles";
import DailyDoneItem from "../DailyDoneItem/DailyDoneItem";

interface IModalProps {
  isOpen: boolean;
  setIsOpen: any;
  dailyDoneList: any;
}

const DailyDoneModal = ({ isOpen, setIsOpen, dailyDoneList }: IModalProps) => {
  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <SSection onClick={handleModalClose}>
      <SDiv onClick={handleModalClick}>
        {dailyDoneList.map((item: any, index: number) => (
          <DailyDoneItem doneItem={item} key={index}></DailyDoneItem>
        ))}
      </SDiv>
    </SSection>
  );
};

export default DailyDoneModal;
