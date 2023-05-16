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

  const category: any = {
    github: ["repository", "commit messgage"],
    feed: ["title", "post link"],
    algo: ["problem", "link"],
    blog: ["title", "link"],
    cs: ["problem", "category"],
  };

  console.log(dailyDoneList, "DL");
  return (
    <SSection onClick={handleModalClose}>
      {dailyDoneList && dailyDoneList[0].type === "cs" ? (
        <SDiv>
          <div>상세 내역이 없습니다.</div>
        </SDiv>
      ) : (
        <SDiv onClick={handleModalClick}>
          <div className="doneItem__column__wrapper">
            <div className="doneItem__left__column">
              {dailyDoneList ? category[dailyDoneList[0].type][0] : null}
            </div>
            <div className="doneItem__right__column">
              {dailyDoneList ? category[dailyDoneList[0].type][1] : null}
            </div>
          </div>
          {dailyDoneList.map((item: any, index: number) => (
            <DailyDoneItem doneItem={item} key={index}></DailyDoneItem>
          ))}
        </SDiv>
      )}
    </SSection>
  );
};

export default DailyDoneModal;
