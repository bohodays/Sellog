import React from "react";
import { SMain, SHeader, SBody, SSection, SArticle } from "./styles";
import LargeSmile from "@/assets/imgs/retro/smile_large.png";
import GreenFlower from "@/assets/imgs/retro/green_flower.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faTag,
  faFireFlameCurved,
} from "@fortawesome/free-solid-svg-icons";
export default function Feed() {
  return (
    <SMain>
      <SHeader>
        <div className="home">
          <button className="go-to-home">HOME</button>
        </div>
        <div className="title__container">
          <div className="developer">
            <p className="title__text">Developer</p>
          </div>
          <div className="feed">Feed</div>
        </div>
        {/* <h2 className="logo">Logo</h2> */}
        <img src={GreenFlower} alt="green flower" className="sticker2" />
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
        <SArticle>
          <div className="feed__card">
            <p>
              Feed Title Feed Title Feed Title Feed Title Feed Title Feed
              TitleFeed TitleFeed TitleFeed Title ed Title Feed Title Feed
              TitleFeed TitleFeed TitleFeed Title
            </p>
            <div className="feed__card-info">
              <p className="feed__card-source">출처: 당근마켓</p>
              <div className="feed__card-detail">
                <p> 42view </p>
                <p> 2023-04-26</p>
              </div>
            </div>
          </div>
        </SArticle>
        <img className="sticker1" src={LargeSmile} alt="스마일 큰거" />
      </SBody>
    </SMain>
  );
}
