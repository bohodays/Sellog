import { SDiv } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import {
  ICountDoneItem,
  IDoneItemProps,
} from "@/typeModels/mygoals/myRecordInterfaces";
// interface ICountDoneProps {
//   doneItem: ICountDoneItem;
// }
const DailyDoneItem = ({ doneItem }: IDoneItemProps) => {
  return (
    <SDiv>
      <div className="doneItem__wrapper">{doneItem?.message}</div>
    </SDiv>
  );
};

export default DailyDoneItem;
