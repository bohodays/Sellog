import { useState } from "react";
import { SSection, SArticle } from "./styles";
import Chart from "../Chart/Chart";
import Accumulate from "../Accumulate/Accumulate";
import RCalendar from "../RCalendar/RCalendar";
import DailyDoneList from "../DailyDoneList/DailyDoneList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

// Record
const Record = () => {
  const [selectedDateProps, setSelectedDateProps] = useState(new Date());
  const homeNavigator = useNavigate();
  const getOutHandler = () => {
    homeNavigator("/main");
    window.location.reload();
  };
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
      <FontAwesomeIcon
        icon={faRightFromBracket}
        className="goHome__button"
        onClick={getOutHandler}
      />
    </SSection>
  );
};

export default Record;
