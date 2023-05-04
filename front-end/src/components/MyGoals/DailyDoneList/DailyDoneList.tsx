import { useState, useEffect } from "react";
import { SSection } from "./styles";
import cool from "@/assets/imgs/itemShop/cool.png";
import rainbow from "@/assets/imgs/itemShop/rainbow.png";
import DailyDoneItem from "../DailyDoneItem/DailyDoneItem";
import { apiGetMonthlyRecordList, apiGetTodayRecord } from "@/api/record";
import {
  IDoneList,
  ICountDoneItem,
} from "@/typeModels/mygoals/myRecordInterface";

interface ISelectedDate {
  selectedDateProps: Date;
}
const countDone = [
  { type: "github", doneCount: 3 },
  { type: "blog", doneCount: 1 },
  { type: "csquiz", doneCount: 4 },
  { type: "algorithm", doneCount: 5 },
  { type: "feed", doneCount: 2 },
];
const DailyDoneList = ({ selectedDateProps }: ISelectedDate) => {
  const [doneList, setDoneList] = useState<IDoneList | null>(null);
  const [todayDoneList, setTodayDoneList] = useState<IDoneList | null>(null);
  const [countDoneList, setCountDoneList] = useState<ICountDoneItem[] | null>(
    []
  );

  useEffect(() => {
    apiGetTodayRecord().then((r) => {
      setTodayDoneList(() => r?.data.response);
      const newTodayDoneList = [];
      for (let item in r?.data.response) {
        newTodayDoneList.push({
          type: item,
          count: r?.data.response[item]?.length || 0,
        });
      }
      setCountDoneList(newTodayDoneList);
    });
  }, []);

  useEffect(() => {
    apiGetMonthlyRecordList(2023, 5).then((r) => {
      setDoneList(r?.data.response);
      console.log("롸", doneList);
    });
  }, []);

  return (
    <SSection>
      <div className="selected__date">
        {selectedDateProps.toLocaleDateString()}
      </div>
      <img className="cool__img" src={cool}></img>
      {
        // countDoneList != null &&
        countDoneList?.map((item, index) => (
          <DailyDoneItem doneItem={item} key={index}></DailyDoneItem>
        ))
      }
      <img className="rainbow__img" src={rainbow}></img>
    </SSection>
  );
};

export default DailyDoneList;
