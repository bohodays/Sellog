import {
  Check,
  CheckBoxOutlineBlankOutlined,
  CheckBoxOutlined,
} from "@mui/icons-material";
import React from "react";
import { SDiv } from "./styles";

const DailyDoneItem = ({ doneItem }: any) => {
  return (
    <SDiv>
      <div className="doneItem__wrapper">
        <CheckBoxOutlined></CheckBoxOutlined>
        <div>{doneItem?.type}</div>
        <div>{doneItem?.doneCount}</div>
      </div>
    </SDiv>
  );
};

export default DailyDoneItem;
