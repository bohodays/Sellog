import { useState, useEffect } from "react";
import { SDiv } from "./styles";
import { IDoneItemProps } from "@/typeModels/mygoals/myRecordInterfaces";

const DailyDoneItem = ({ doneItem }: IDoneItemProps) => {
  const [repo, setRepo] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const category: any = {
    github: ["repository", "commit messgage"],
    feed: ["title", "post link"],
    algo: ["problem", "link"],
  };

  useEffect(() => {
    if (doneItem?.type === "github") {
      setRepo(doneItem.message.split("/")[0]);
      setMessage(doneItem.message.split("/")[1]);
    } else if (doneItem?.type === "algo") {
      const openingBracketIndex = doneItem.message.indexOf("[문제 링크]");
      const closingBracketIndex = doneItem.message.indexOf(
        ")",
        openingBracketIndex
      );

      const frontLink = doneItem.message
        .substring(0, openingBracketIndex)
        .trim();
      const problemLink = doneItem.message.substring(
        openingBracketIndex + 8,
        closingBracketIndex
      );

      setRepo(frontLink);
      setLink(problemLink);
    }
  }, []);
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <SDiv onClick={handleModalClick}>
      <div style={{ display: "flex", textAlign: "center" }}>
        <div
          style={{
            width: "30%",
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "3px",
              borderBottom: "2px solid lightgrey",
              borderRight: "2px solid lightgrey",
            }}
          >
            {category[doneItem.type][0]}
          </div>
          <p>{repo ? repo : null}</p>
        </div>
        <div
          style={{
            width: "70%",
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "3px",
              borderBottom: "2px solid lightgrey",
            }}
          >
            {category[doneItem.type][1]}
          </div>
          <p style={{ fontSize: "0.8vw" }}>{message ? message : null}</p>
          <p>
            {link && (
              <a href={link} style={{ color: "red", wordWrap: "break-word" }}>
                {link}
              </a>
            )}
          </p>
        </div>
      </div>
    </SDiv>
  );
};

export default DailyDoneItem;
