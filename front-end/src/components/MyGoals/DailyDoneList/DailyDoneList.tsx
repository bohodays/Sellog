import { useState, useEffect } from "react";
import { SSection, SDiv } from "./styles";
import cool from "@/assets/imgs/itemShop/cool.png";
import rainbow from "@/assets/imgs/itemShop/rainbow.png";
import { apiGetMonthlyRecordList, apiGetTodayRecord } from "@/api/record";
import { IDoneList } from "@/typeModels/mygoals/myRecordInterfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import moment from "moment";
import DailyDoneModal from "../DailyDoneModal/DailyDoneModal";

interface ISelectedDate {
  selectedDateProps: Date;
}

const DailyDoneList = ({ selectedDateProps }: ISelectedDate) => {
  // modal
  const [isOpen, setIsOpen] = useState(false);
  const [activeType, setActiveType] = useState("");

  const handleOpen = (e: any) => {
    setIsOpen(true);
    // console.log(e.target.id);
    setActiveType(e.target.id);
  };

  const selectedDate = selectedDateProps.toLocaleDateString().split(".");
  const [selectedYear, setSelectedYear] = useState(Number(selectedDate[0]));
  const [selectedMonth, setSelectedMonth] = useState(Number(selectedDate[1]));
  const [monthlyDoneList, setMonthlyDoneList] = useState<IDoneList | null>(
    null
  );

  // type ["algo" : [{IDoneItem}, {IDoneItem} ... ]] 수정
  const [dailyDoneList, setDailyDoneList] = useState<any | null>(null);

  useEffect(() => {
    setSelectedYear(Number(selectedDate[0]));
    setSelectedMonth(Number(selectedDate[1]));
  }, [selectedDateProps]);

  // 선택 날짜가 바뀔 때마다 한달 기록에서 선택 날짜와 같은 데이터를 filter후 setDailyDoneList 갱신
  useEffect(() => {
    const selectedRecordList = monthlyDoneList?.[
      moment(selectedDateProps).format("YYYYMMDD")
    ]
      ? monthlyDoneList[moment(selectedDateProps).format("YYYYMMDD")]
      : null;
    setDailyDoneList(selectedRecordList);
  }, [monthlyDoneList, selectedDateProps]);

  // selectedYear, selectedMonth 중 하나가 바뀌면 한달 기록 요청 보내서 setMonthlyDoneList 갱신
  useEffect(() => {
    apiGetMonthlyRecordList(selectedYear, selectedMonth).then((r) => {
      setMonthlyDoneList(r?.data.response);
    });
  }, [selectedYear, selectedMonth]);

  return (
    <SSection>
      <img className="cool__img" src={cool}></img>
      <div className="selected__date">
        {selectedDateProps.toLocaleDateString()}
      </div>
      {dailyDoneList === null && <h4>달성 내역이 없습니다.</h4>}
      {/* github */}
      <SDiv>
        {dailyDoneList?.["github"] && (
          <div className="doneCount__wrapper" onClick={handleOpen} id="github">
            <div>
              <FontAwesomeIcon icon={faSquareCheck} />
              <span className="type" onClick={handleOpen}>
                github
              </span>
            </div>
            {isOpen && activeType === "github" && (
              <DailyDoneModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                dailyDoneList={dailyDoneList?.["github"]}
              ></DailyDoneModal>
            )}
            <span className="count" onClick={handleOpen}>
              github {dailyDoneList?.["github"]?.length}
            </span>
          </div>
        )}
        {/* blog */}
        {dailyDoneList?.["blog"] && (
          <div className="doneCount__wrapper" onClick={handleOpen} id="blog">
            <div>
              <FontAwesomeIcon icon={faSquareCheck} />
              <span className="type">blog</span>
            </div>
            <span className="count">
              post {dailyDoneList?.["blog"]?.length}
            </span>
            {isOpen && activeType === "blog" && (
              <DailyDoneModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                dailyDoneList={dailyDoneList?.["blog"]}
              ></DailyDoneModal>
            )}
          </div>
        )}

        {/* algo */}
        {dailyDoneList?.["algo"] && (
          <div className="doneCount__wrapper" onClick={handleOpen} id="algo">
            <div>
              <FontAwesomeIcon icon={faSquareCheck} />
              <span className="type">algorithm</span>
            </div>
            <span className="count">
              problem {dailyDoneList?.["algo"]?.length}
            </span>
            {isOpen && activeType === "algo" && (
              <DailyDoneModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                dailyDoneList={dailyDoneList?.["algo"]}
              ></DailyDoneModal>
            )}
          </div>
        )}

        {/* feed */}
        {dailyDoneList?.["feed"] && (
          <div className="doneCount__wrapper" onClick={handleOpen} id="feed">
            <div>
              <FontAwesomeIcon icon={faSquareCheck} />
              <span className="type">feed</span>
            </div>
            <span className="count">
              feed {dailyDoneList?.["feed"]?.length}
            </span>
            {isOpen && activeType === "feed" && (
              <DailyDoneModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                dailyDoneList={dailyDoneList?.["feed"]}
              ></DailyDoneModal>
            )}
          </div>
        )}
        {/* csquiz */}
        {dailyDoneList?.["cs"] && (
          <div className="doneCount__wrapper__cs" onClick={handleOpen} id="cs">
            <div>
              <FontAwesomeIcon icon={faSquareCheck} />
              <span className="type">csquiz</span>
            </div>
            <span className="count">quiz {dailyDoneList?.["cs"]?.length}</span>
            {/* {isOpen && activeType === "cs" && (
              <DailyDoneModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                dailyDoneList={dailyDoneList?.["cs"]}
              ></DailyDoneModal>
            )} */}
          </div>
        )}
        <img className="rainbow__img" src={rainbow}></img>
      </SDiv>
    </SSection>
  );
};

export default DailyDoneList;
