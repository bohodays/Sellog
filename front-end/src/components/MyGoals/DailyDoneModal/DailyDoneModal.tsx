import { useRef, useEffect } from "react";
import { SDiv } from "./styles";
import DailyDoneItem from "../DailyDoneItem/DailyDoneItem";

interface IModalProps {
  isOpen: boolean;
  setIsOpen: any;
  dailyDoneList: any;
}

const DailyDoneModal = ({ isOpen, setIsOpen, dailyDoneList }: IModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  console.log(dailyDoneList);

  // 이벤트 핸들러 함수
  const handler = (event: MouseEvent) => {
    // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
    if (modalRef.current != (event.target as Node)) {
      setIsOpen(false);
    }
    console.log("target", event.target);
    console.log("modalRef.current", modalRef.current);
    console.log("taget as Node", event.target as Node);
    console.log("같냐", modalRef.current === (event.target as Node));
  };

  useEffect(() => {
    console.log("뭐임", modalRef.current);
    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  });

  return (
    <SDiv ref={modalRef}>
      {dailyDoneList.map((item: any, index: number) => (
        <DailyDoneItem doneItem={item} key={index}></DailyDoneItem>
      ))}
    </SDiv>
  );
};

export default DailyDoneModal;
