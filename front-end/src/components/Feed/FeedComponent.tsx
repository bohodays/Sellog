import React, { useEffect } from "react";
import { SArticle } from "./styles";
import { Link } from "react-router-dom";
import { addVisitApi } from "@/api/feed";
import { addFeedRecordApi } from "@/api/record";

export default function FeedComponent({ props }: any) {
  function feedHandler() {
    const postFeed = {
      type: "feed",
      message: `${props.title}_${props.link}`,
      feedId: `${props.feedId}`,
    };
    addFeedRecordApi(postFeed).then((res) => console.log(res));
    addVisitApi(props.feedId);
  }
  // useEffect(() => {
  //   console.log("feedId", props.feedId, "feed view", props.views);
  // }, [props.visit]);
  return (
    <SArticle>
      <Link
        className="container"
        rel="stylesheet"
        to={props.link}
        onClick={feedHandler}
        target="_blank"
      >
        <div className="feed__card">
          <p style={{ marginBottom: "1rem" }}>
            {props.title.length > 32
              ? props.title.slice(0, 32) + " ..."
              : props.title}
          </p>
          <div className="feed__card-info">
            <p className="feed__card-source">출처: {props.company}</p>
            <div className="feed__card-detail">
              <p> {props.views}view </p>
              <p> {props.pub_date.slice(0, 10)}</p>
            </div>
          </div>
        </div>
      </Link>
    </SArticle>
  );
}
