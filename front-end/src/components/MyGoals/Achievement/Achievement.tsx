import { useState } from "react";
import { SSection, SArticle } from "./styles";
import Chart from "../Chart/Chart";
import Accumulate from "../Accumulate/Accumulate";
import RCalendar from "../RCalendar/RCalendar";
import DailyDoneList from "../DailyDoneList/DailyDoneList";

const Achievement = () => {
  const [selectedDateProps, setSelectedDateProps] = useState(new Date());
  return (
    <SSection>
      <SArticle>
        <Accumulate></Accumulate>
        <Chart></Chart>
      </SArticle>
      <SArticle>
        <RCalendar setSelectedDateProps={setSelectedDateProps}></RCalendar>
        <DailyDoneList selectedDateProps={selectedDateProps}></DailyDoneList>
      </SArticle>
    </SSection>
  );
};

export default Achievement;
