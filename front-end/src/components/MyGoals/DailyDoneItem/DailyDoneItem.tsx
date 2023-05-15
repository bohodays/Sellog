import { useState, useEffect } from "react";
import { SDiv } from "./styles";
import { IDoneItemProps } from "@/typeModels/mygoals/myRecordInterfaces";

const DailyDoneItem = ({ doneItem }: IDoneItemProps) => {
  const [message, setMessage] = useState<any>();
  const category: any = {
    github: ["repository", "commit messgage"],
    feed: ["title", "post link"],
    algo: ["problem"],
  };
  let repo = "";

  useEffect(() => {
    if (doneItem?.type === "github") {
      repo = doneItem.message.split("/")[0];
      setMessage(doneItem.message.split("/")[1]);
    } else if (doneItem?.type === "algo") {
      console.log("최초", doneItem.message);
      setMessage(doneItem.message.replaceAll("[문제 링크]", ""));
      setMessage(doneItem.message.replaceAll("]", ""));
      setMessage(doneItem.message.replaceAll("[", ""));
    }
  }, []);
  console.log(repo, message);
  return (
    <SDiv>
      <div className="doneItem__wrapper">
        {message}
        {/* {doneItem?.message} */}
        <p>
          {category[doneItem.type][0]} : {repo ? repo : null}
        </p>
        <p>
          {category[doneItem.type][1]} : {message ? message : null}
        </p>
      </div>
    </SDiv>
  );
};

export default DailyDoneItem;
