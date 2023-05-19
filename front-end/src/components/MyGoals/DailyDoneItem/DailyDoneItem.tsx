import { useState, useEffect } from "react";
import { SDiv } from "./styles";
import { IDoneItemProps } from "@/typeModels/mygoals/myRecordInterfaces";

const DailyDoneItem = ({ doneItem }: IDoneItemProps) => {
  // console.log(doneItem, "doneItem");
  const [repo, setRepo] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const category: any = {
    github: ["repository", "commit messgage"],
    feed: ["title", "post link"],
    algo: ["problem", "link"],
    blog: ["title", "link"],
    cs: ["problem", "category"],
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
    } else if (doneItem?.type === "feed") {
      setRepo(doneItem.message.split("_")[0]);
      setLink(doneItem.message.split("_")[1]);
    } else if (doneItem?.type === "blog") {
      // Title 추출
      let titleStartIndex = doneItem.message.indexOf("Title:") + 7; // "Title:" 이후 인덱스
      let titleEndIndex = doneItem.message.indexOf("\n", titleStartIndex); // 줄바꿈 문자 이전 인덱스
      let slicedTitle = doneItem.message
        .substring(titleStartIndex, titleEndIndex)
        .trim();

      // URL 추출
      let urlStartIndex = doneItem.message.indexOf("URL:") + 5; // "URL:" 이후 인덱스
      let urlEndIndex = doneItem.message.indexOf("\n", urlStartIndex); // 줄바꿈 문자 이전 인덱스
      let slicedUrl = doneItem.message
        .substring(urlStartIndex, urlEndIndex)
        .trim();

      // console.log(slicedTitle, slicedUrl, "blog");
      setRepo(slicedTitle);
      setLink(slicedUrl);
    }
  }, []);
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <SDiv onClick={handleModalClick}>
      <div className="doneItem__container">
        <div className="doneItem__left__column">
          <p className="doneItem__title">{repo ? repo : null}</p>
        </div>
        <div className="doneItem__right__column">
          <p className={message ? "doneItem__msg" : ""}>
            {message ? message : null}
          </p>
          <p className="doneItem__msg doneItem__link">
            {link && <a href={link}>{link}</a>}
          </p>
        </div>
      </div>
    </SDiv>
  );
};

export default DailyDoneItem;
