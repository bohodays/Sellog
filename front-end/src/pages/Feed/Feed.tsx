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
  // const page = useRef(1);
  let page = 1;
  const observerRef = useRef(null);

  // 무한 스크롤
  // intersection observer options
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };
  let callback = (entries: any, observer: any) => {
    console.log(newsfeed, "callback");

    entries.forEach((entry: any) => {
      // 관찰중인 태그가 교차할때 root와
      if (entry.isIntersecting) {
        page++;
        console.log("get Next page", page);
        // api call
        getFeedApi(page).then(({ data }: any) => {
          console.log({ page });

          console.log("inf scroll data", data.response);
          console.log("prev newsfeed", newsfeed);
          // const newLoadedFeed = news

          setNewsFeed([...newsfeed, ...data.response]);
        });
      }
    });
  };
  let target: any = observerRef.current;

  // 피드 불러오기
  useEffect(() => {
    // 초기 데이터 불러오기
    if (newsfeed === undefined) {
      console.log("hi");

      getFeedApi(page).then(({ data }: any | undefined) => {
        setNewsFeed(data.response);
        // console.log(data.response);
      });
    }
    getMostView().then((data: any) => {
      setMostViewFeed(data.response);
    });
  }, []);

  // 무한 스크롤
  useEffect(() => {
    if (newsfeed != undefined) {
      setIsFeed(true);
    }
    if (mostViewFeed != undefined) {
      setIsMostView(true);
    }
    console.log("useEffect", newsfeed);
    //observer  생성
    let observer = new IntersectionObserver(callback, options);
    // console.log("target", target);
    // 감지할 대상이 undefined가 아닐때
    if (target) {
      observer.observe(target); //callback 실행
      console.log("obseved");
    }
    return () => {
      observer.disconnect();
      console.log("disconnect", target);
    };
  }, [target, newsfeed, mostViewFeed]);

  const feedHandler = () => {
    console.log({ newsfeed }, { page });
    // console.log({ observerRef });
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
          <div className="search">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <span>검색하기</span>
            <br />
            <br />
            <input type="text" placeholder="검색창" />
            <br />
            <hr />
            <FontAwesomeIcon icon={faTag} />
            <span>추천 키워드 </span>
            <br />
            <br />
            <div>
              <button className="keyword__button">AI</button>
              <button className="keyword__button">클라우드</button>
              <button className="keyword__button">빅데이터</button>
              <button className="keyword__button">운영체제</button>
              <button className="keyword__button">알고리즘</button>
            </div>
          </div>
          <div className="mostviewed">
            <FontAwesomeIcon icon={faFireFlameCurved} />
            <span> 가장 많이 본 피드</span>
            <div className="mostviewed__list">
              {isMostView &&
                mostViewFeed.map((feed: any, index: number) => {
                  <li> {feed.title}</li>;
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
          <div ref={observerRef}>1</div>
        </div>
        <img className="sticker1" src={LargeSmile} alt="스마일 큰거" />
      </SBody>
    </SMain>
  );
}
