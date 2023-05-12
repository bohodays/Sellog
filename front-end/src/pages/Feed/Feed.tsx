import React, { ReactNode } from "react";
import { SMain, SHeader, SBody, SSection } from "./styles";
import LargeSmile from "@/assets/imgs/retro/smile_large.png";
import GreenFlower from "@/assets/imgs/retro/green_flower.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import {
  faMagnifyingGlass,
  faTag,
  faFireFlameCurved,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import FeedComponent from "@/components/Feed/FeedComponent";
import { getFeedApi, getMostView } from "@/api/feed";

export default function Feed() {
  const navigate = useNavigate();
  const homeNavigator = useNavigate();
  const getOutHandler = () => {
    homeNavigator("/main");
  };
  const [newsfeed, setNewsFeed] = useState<any>();
  const [mostViewFeed, setMostViewFeed] = useState<any>();
  // intersecting 판별용 상태
  const [isLoading, setIsLoading] = useState(false);
  const [isFeed, setIsFeed] = useState<boolean>(false);
  const [isMostView, setIsMostView] = useState<boolean>(false);
  const [lastPage, setLastPage] = useState<boolean>(false);
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
    console.log({ lastPage });

    if (lastPage == false) {
      entries.forEach((entry: any) => {
        // 관찰중인 태그가 교차할때 root와
        // page++;
        if (entry.isIntersecting) {
          // api call

          getFeedApi(page).then(({ data }: any) => {
            console.log("new", data.response);
            if (data.response.last) {
              setLastPage(true);
            }
            setNewsFeed([...newsfeed, ...data.response.content]);
            setPage((prev) => prev + 1);
          });
        }
      });
    }
  };
  let target: any = observerRef.current;

  // 피드 불러오기
  useEffect(() => {
    // console.log({ lastPage });

    // 초기 데이터 불러오기
    if (newsfeed === undefined) {
      getFeedApi(page).then(({ data }: any | undefined) => {
        console.log(data.response);
        // setLastPage(data.response.pageable.pageSize);
        setNewsFeed(data.response.content);
      });
    }
    if (mostViewFeed === undefined) {
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

    // console.log("useEffect", mostViewFeed);
    //observer  생성
    let observer = new IntersectionObserver(callback, options);
    // 감지할 대상이 undefined가 아닐때
    if (target) {
      observer.observe(target); //callback 실행
    }
    return () => {
      observer.disconnect();
      // console.log("disconnect", target);
    };
  }, [target, newsfeed]);

  useEffect(() => {
    if (mostViewFeed != undefined) {
      setIsMostView(true);
    }
    console.log({ mostViewFeed });
  }, [mostViewFeed]);

  const feedHandler = () => {
    console.log({ newsfeed }, lastPage);
    // mostViewFeed.forEach((element: any) => {
    //   console.log(element["title"]);
    // });
  };
  const viewHandler = (i: number) => {
    console.log(i);
    if (i < 8) {
    }
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
                mostViewFeed.map((element: any, index: number) => {
                  return (
                    <li key={index} className="mostview__element">
                      <Link to={element.link}>{element["title"]}</Link>
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
          <div ref={observerRef} className="intersection__div"></div>
        </div>
        <img className="sticker1" src={LargeSmile} alt="스마일 큰거" />
      </SBody>
      <FontAwesomeIcon
        icon={faRightFromBracket}
        className="goHome__button"
        onClick={getOutHandler}
      />
    </SMain>
  );
}
