import React, { useEffect } from "react";
import { SArticle } from "./styles";
import { Link } from "react-router-dom";
import { addVisitApi } from "@/api/feed";

export default function FeedComponent({ props }: any) {
  // console.log(props, "aa");
  function feedHandler() {
    console.log(props.feedId, "feedId");
    addVisitApi(props.feedId);
  }
  // useEffect(() => {
  //   console.log("feedId", props.feedId, "feed view", props.views);
  // }, [props.visit]);
  return (
    <SArticle>
      <div className="feed__card">
        <Link rel="stylesheet" to={props.link} onClick={feedHandler}>
          <p>{props.title}</p>
        </Link>
        <div className="feed__card-info">
          <p className="feed__card-source">출처: {props.company}</p>
          <div className="feed__card-detail">
            <p> {props.views}view </p>
            <p> {props.pub_date.slice(0, 10)}</p>
          </div>
        </div>
      </div>
    </SArticle>
  );
}
