import { SDiv } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";

const DailyDoneItem = ({ doneItem }: any) => {
  return (
    <SDiv>
      <div className="doneItem__wrapper">
        <FontAwesomeIcon icon={faSquareCheck} />
        <div>{doneItem?.type}</div>
        <div>{doneItem?.doneCount}</div>
      </div>
    </SDiv>
  );
};

export default DailyDoneItem;
