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
  let selectedDate = selectedDateProps.toLocaleDateString().split(".");

  const [selectedYear, setSelectedYear] = useState(Number(selectedDate[0]));
  const [selectedMonth, setSelectedMonth] = useState(Number(selectedDate[1]));
  const [monthlyDoneList, setMonthlyDoneList] = useState<IDoneList | null>(
    null
  );

  // today 없어도 될듯 수정
  const [todayDoneList, setTodayDoneList] = useState<IDoneList | null>(null);

  // type ["algo" : [{IDoneItem}, {IDoneItem} ... ]] 수정
  const [dailyDoneList, setDailyDoneList] = useState<any | null>(null);
  const [countDoneList, setCountDoneList] = useState<ICountDoneItem[] | null>(
    []
  );

  // 수정
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

  // 선택 날짜가 바뀔 때마다 한달 기록에서 선택 날짜와 같은 데이터를 filter후 setDailyDoneList 갱신
  useEffect(() => {
    const selectedRecordList = monthlyDoneList
      ? [selectedDateProps.toISOString().slice(0, 10).replaceAll("-", "")]
      : null;
    if (selectedRecordList) {
      setDailyDoneList(selectedRecordList);
    }
  }, [selectedDate]);

  // selectedYear, selectedMonth 중 하나가 바뀌면 한달 기록 요청 보내서 setMonthlyDoneList 갱신
  useEffect(() => {
    apiGetMonthlyRecordList(selectedYear, selectedMonth).then((r) => {
      setMonthlyDoneList(r?.data.response);
      console.log(r?.data.response);
      console.log("롸", monthlyDoneList);
    });
  }, [selectedYear, selectedMonth]);

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
