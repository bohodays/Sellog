import { SDiv } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { ICountDoneItem } from "@/typeModels/mygoals/myRecordInterface";

interface ICountDoneProps {
  doneItem: ICountDoneItem;
}
const DailyDoneItem = ({ doneItem }: ICountDoneProps) => {
  return (
    <SDiv>
      <div className="doneItem__wrapper">
        <FontAwesomeIcon icon={faSquareCheck} />
        <div>{doneItem?.type}</div>
        <div>{doneItem?.count}</div>
      </div>
    </SDiv>
  );
};

export default DailyDoneItem;
