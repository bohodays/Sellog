import React from "react";
import { SSection, StyledCalendar } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const RCalendar = () => {
  return (
    <SSection>
      <StyledCalendar
        // onChange={changeData}
        formatDay={(locale, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }
        selectRange={true}
        nextLabel={<FontAwesomeIcon icon={faAngleRight} size="xl" />}
        prevLabel={<FontAwesomeIcon icon={faAngleLeft} size="xl" />}
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        calendarType="US"
        // 영어로 변경
        locale={"en"}
      ></StyledCalendar>
    </SSection>
  );
};

export default RCalendar;
