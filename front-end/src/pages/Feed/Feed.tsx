import React, { ReactNode } from "react";
import { SMain, SHeader, SBody, SSection } from "./styles";
import LargeSmile from "@/assets/imgs/retro/smile_large.png";
import GreenFlower from "@/assets/imgs/retro/green_flower.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faTag,
  faFireFlameCurved,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import FeedComponent from "@/components/Feed/FeedComponent";
import { getFeedApi, getMostView } from "@/api/feed";

export default function Feed() {
  const navigate = useNavigate();
  const [newsfeed, setNewsFeed] = useState<any>();
  const [mostViewFeed, setMostViewFeed] = useState<any>();
  // intersecting 판별용 상태
  const [isLoading, setIsLoading] = useState(false);
  const [isFeed, setIsFeed] = useState<boolean>(false);
  const [isMostView, setIsMostView] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  // let page = 1;
  const observerRef = useRef(null);

  // 무한 스크롤
  // intersection observer options
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };
  let callback = (entries: any, observer: any) => {
    if (page < 9) {
      entries.forEach((entry: any) => {
        // 관찰중인 태그가 교차할때 root와
        // page++;
        if (entry.isIntersecting) {
          // api call
          console.log({ page }, "???????????");

          getFeedApi(page).then(({ data }: any) => {
            setNewsFeed([...newsfeed, ...data.response]);
            setPage((prev) => prev + 1);
          });
        }
      });
    }
  };
  let target: any = observerRef.current;

  // 피드 불러오기
  useEffect(() => {
    // 초기 데이터 불러오기
    if (newsfeed === undefined) {
      getFeedApi(page).then(({ data }: any | undefined) => {
        setNewsFeed(data.response);
      });
    }
    if (mostViewFeed === undefined) {
      console.log("hi");
      getMostView().then(({ data }: any) => {
        setMostViewFeed(data.response);
      });
    }
  }, []);

  // 무한 스크롤
  useEffect(() => {
    if (newsfeed != undefined) {
      setIsFeed(true);
    }

    console.log("useEffect", mostViewFeed);
    //observer  생성
    let observer = new IntersectionObserver(callback, options);
    // 감지할 대상이 undefined가 아닐때
    if (target) {
      observer.observe(target); //callback 실행
    }
    return () => {
      observer.disconnect();
      console.log("disconnect", target);
    };
  }, [target, newsfeed]);

  useEffect(() => {
    if (mostViewFeed != undefined) {
      setIsMostView(true);
    }
  }, [mostViewFeed]);

  const feedHandler = () => {
    console.log({ newsfeed }, { page });
    mostViewFeed.forEach((element: ReactNode) => {
      console.log(element["title"]);
    });
  };

  return (
    <SMain>
      <SHeader>
        <div className="home">
          <button
            className="go-to-home"
            onClick={() => {
              navigate("/main");
              window.location.reload();
            }}
          >
            HOME
          </button>
        </div>
        <div className="title__container">
          <div className="developer">
            <p className="title__text">Developer</p>
          </div>
          <div className="feed">Feed</div>
        </div>
        {/* <h2 className="logo">Logo</h2> */}
        <img className="sticker2" src={GreenFlower} alt="green flower" />
        <button onClick={feedHandler}> panic button</button>
      </SHeader>
      <SBody>
        <SSection>
          <div className="mostviewed">
            <FontAwesomeIcon
              icon={faFireFlameCurved}
              style={{ color: "red" }}
            />
            <span> 가장 많이 본 피드</span>
            <div className="mostviewed__list">
              {/* <p> {mostViewFeed}</p> */}
              {isMostView &&
                mostViewFeed.map((element: ReactNode, index: number) => {
                  return (
                    <li key={index} className="mostview__element">
                      {element["title"]}
                    </li>
                  );
                })}
            </div>
          </div>
        </SSection>
        <div className="feed__box">
          {isFeed &&
            newsfeed.map((feed: ReactNode, index: number) => {
              // <p> {feed.company}</p>;

              return <FeedComponent key={index} props={feed}></FeedComponent>;
            })}
          <div ref={observerRef}></div>
        </div>
        <img className="sticker1" src={LargeSmile} alt="스마일 큰거" />
      </SBody>
    </SMain>
  );
}
