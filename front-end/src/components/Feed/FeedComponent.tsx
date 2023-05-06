import React from "react";
import { SArticle } from "./styles";
import { IFeedProps } from "@/typeModels/Feed/feedinterfaces";
import { Link } from "react-router-dom";
export default function FeedComponent({ props }: any) {
  console.log(props.company, "aa");

  return (
    <SArticle>
      <div className="feed__card">
        <Link rel="stylesheet" to={props.link}>
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
