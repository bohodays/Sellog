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
import { getFeedApi } from "@/api/feed";

export default function Feed() {
  interface IntersectionObserverInit {
    root?: Element | Document | null;
    rootMargin?: string;
    threshold?: number | number[];
  }
  const navigate = useNavigate();
  const [newsfeed, setNewsFeed] = useState<any>();
  const [isFeed, setIsFeed] = useState<boolean>(false);

  type IntersectHandler = (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => void;

  const useIntersect = (
    onIntersect: IntersectHandler,
    options?: IntersectionObserverInit
  ) => {
    const ref = useRef<HTMLDivElement>(null);
    const callback = useCallback(
      (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) onIntersect(entry, observer);
        });
      },
      [onIntersect]
    );

    useEffect(() => {
      if (!ref.current) return;
      const observer = new IntersectionObserver(callback, options);
      observer.observe(ref.current);
      return () => observer.disconnect();
    }, [ref, options, callback]);

    return ref;
  };

  const observerRef = useRef(null);

  // 피드 불러오기
  useEffect(() => {
    getFeedApi().then(
      ({ data }: any | undefined) => setNewsFeed(data.response)
      // console.log(data.response)
    );
    // console.log(datata, "feeeeed");
  }, []);
  useEffect(() => {
    // console.log("feed updated", newsfeed);
    if (newsfeed != undefined) {
      setIsFeed(true);
    }
  }, [newsfeed]);

  // 조회수 증가

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
              <li> 피드 이름 1</li>
              <li> ㅍ드 이름 2</li>
              <li> 피드 이름 3</li>
              <li> 피드 이름 4</li>
            </div>
          </div>
        </SSection>
        <div className="feed__box">
          {isFeed &&
            newsfeed.map((feed: ReactNode, index: Number) => {
              // <p> {feed.company}</p>;

              return <FeedComponent key={index} props={feed}></FeedComponent>;
            })}
        </div>
        <img className="sticker1" src={LargeSmile} alt="스마일 큰거" />
      </SBody>
    </SMain>
  );
}
