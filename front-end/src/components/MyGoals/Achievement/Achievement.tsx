import React from "react";
import { SSection, SArticle } from "./styles";
import Chart from "../Chart/Chart";
import Accumulate from "../Accumulate/Accumulate";
import RCalendar from "../RCalendar/RCalendar";
import DailyDoneList from "../DailyDoneList/DailyDoneList";

const Achievement = () => {
  return (
    <SSection>
      <SArticle>
        <Accumulate></Accumulate>
        <Chart></Chart>
      </SArticle>
      <SArticle>
        <RCalendar></RCalendar>
        <DailyDoneList></DailyDoneList>
      </SArticle>
    </SSection>
  );
};

export default Achievement;
