import { SProfile } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import { faSquareCheck, faSquare } from "@fortawesome/free-regular-svg-icons";
import profilePic from "@/assets/imgs/retro/profilePic.jpeg";
import github from "@/assets/imgs/retro/github.png";
import tistory from "@/assets/imgs/retro/tistoryIcon.png";
import smileBottom from "@/assets/imgs/retro/smile_bottom.png";
import coin from "@/assets/imgs/retro/coin.png";
import { useEffect, useRef, useState } from "react";
import { Link, Router, useNavigate } from "react-router-dom";
import NoTarget from "../NoTarget/NoTarget";
import { apiGetAchievedRecordList, apiGetTodayRecord } from "@/api/record";
import InstallModal from "../InstallModal/InstallModal";
// recoil atoms
import { userInfoState } from "@/recoil/myroom/atoms";
import { useRecoilState } from "recoil";

interface MyProfileProps {
  userData: any;
  setUserData: any;
  setIsEdit: any;
  isEdit: boolean;
}

const MyProfile = (props: MyProfileProps) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const profileImg: any = useRef(props.userData.img);
  const [newProfileImg, setNewProfileImg] = useState(profileImg.current);
  // 습관 설정이 하나도 안되어 있을 때 컴포넌트 나타남
  const [isTarget, setIsTarget] = useState<boolean>(false);
  // 크롬 확장자 구현 되면 false로 초기화하기
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  // 오늘 목표 달성 했는지
  const [isTodayGithub, setIsTodayGithub] = useState<boolean>(false);
  const [isTodayAlgo, setIsTodayAlgo] = useState<boolean>(false);
  const [isTodayBlog, setIsTodayBlog] = useState<boolean>(false);
  const [isTodayCS, setIsTodayCS] = useState<boolean>(false);
  const [isTodayFeed, setIsTodayFeed] = useState<boolean>(false);

  // 오늘 CS 문제, 피드 가는 링크
  const csNavigator = useNavigate();
  const feedNavigator = useNavigate();

  useEffect(() => {
    console.log("something changed", userInfo, { isInstalled }, { isTarget });
  }, [userInfo, isInstalled]);

  useEffect(() => {
    // if (userInfoState.)
    console.log(userInfo);
    if (
      !userInfo.algo_start_date ||
      !userInfo.blog_start_date ||
      !userInfo.github_start_date ||
      !userInfo.feedTarget ||
      !userInfo.csTarget
    ) {
      setIsTarget(true);
    }
    // 습관 실천 기록 가져오는 api
    apiGetAchievedRecordList().then((data: any) => {
      if (data.response) {
        console.log(data.response);
        setIsInstalled(true);
      }
    });
    // 오늘 습관 실천
    apiGetTodayRecord().then((data: any) => {
      console.log("apiGetTodayRecord", data.data.response);
      if (data.data.response) {
        if (data.data.response.algo) {
          setIsTodayAlgo(true);
        }
        if (data.data.response.github) {
          setIsTodayGithub(true);
        }
        if (data.data.response.blog) {
          console.log("blog committed");
          setIsTodayBlog(true);
        }
        if (data.data.response.cs) {
          setIsTodayCS(true);
        }
        if (data.data.response.feed) {
          setIsTodayFeed(true);
        }
      }
    });
  }, []);
  // 유저 개인정보 수정하는 함수
  const userInfoHandler = () => {
    // console.log("user info", props.userData);
    props.setIsEdit(!props.isEdit);
  };
  const todayCSHandler = () => {
    csNavigator("/csquiz");
  };
  const todayFeedHandler = () => {
    feedNavigator("/feed");
  };

  return (
    <SProfile>
      <div className="head"> ABOUT ME</div>
      <img className="sticker__smilebottom" src={smileBottom} alt="" />
      <div className="body__profile">
        <div className="container__baseinfo">
          <label htmlFor="file-input">
            <img
              className="img__profile"
              src={newProfileImg}
              alt="profile pic"
            />
          </label>
          <input
            type="file"
            style={{ display: "none" }}
            accept="image/jpg,impge/png,image/jpeg"
            name="profile_img"
            ref={profileImg}
          />
          <div className="container__userinfo">
            <p className="username">{userInfo.nickname}</p>
            <div className="point__container">
              <img className="sticker__coin" src={coin} alt="coin" />
              <p>{userInfo.points}</p>
            </div>
          </div>
        </div>
        <div className="bottom__profile">
          <p>{userInfo.motto}</p>
          <button className="button__goal" onClick={userInfoHandler}>
            Edit
          </button>
        </div>
        <hr />
        {/* component 갈아끼우기 */}

        {isTarget == null ? (
          <NoTarget />
        ) : (
          <div className="container__habit">
            Today
            <div className="container__habit-stats">
              github
              <div className="progress__bar progress__bar--github">
                {userInfo.githubTarget ? (
                  userInfo.githubTarget
                ) : (
                  <p>깃 허브 습관 설정 하세요</p>
                )}
              </div>
              <div className="checked__today">
                {isTodayGithub ? (
                  <FontAwesomeIcon icon={faSquareCheck} />
                ) : (
                  <FontAwesomeIcon icon={faSquare} />
                )}
              </div>
            </div>
            <div className="container__habit-stats">
              blog
              <div className="progress__bar progress__bar--blog">
                {props.userData.blogTarget ? (
                  props.userData.blogTarget
                ) : (
                  <p> 블로그 습관을 설정 하세요</p>
                )}
              </div>
              <div className="checked__today">
                {isTodayBlog ? (
                  <FontAwesomeIcon icon={faSquareCheck} />
                ) : (
                  <FontAwesomeIcon icon={faSquare} />
                )}
              </div>
            </div>
            <div className="container__habit-stats">
              algorithm
              <div className="progress__bar progress__bar--algorithm">
                {props.userData.bojTarget ? (
                  props.userData.bojTarget
                ) : (
                  <p> 알고리즘 습관을 설정 하세요</p>
                )}
              </div>
              <div className="checked__today">
                {isTodayAlgo ? (
                  <FontAwesomeIcon icon={faSquareCheck} />
                ) : (
                  <FontAwesomeIcon icon={faSquare} />
                )}
              </div>
            </div>
            <div className="container__habit-stats">
              CS
              <div
                className="progress__bar progress__bar--CS"
                onClick={todayCSHandler}
              >
                {props.userData.csTarget ? (
                  <p>오늘의 CS 문제</p>
                ) : (
                  <p>매일 CS 문제 풀기</p>
                )}
              </div>
              <div className="checked__today">
                {isTodayCS ? (
                  <FontAwesomeIcon icon={faSquareCheck} />
                ) : (
                  <FontAwesomeIcon icon={faSquare} />
                )}
              </div>
            </div>
            <div className="container__habit-stats">
              Feed
              <div
                className="progress__bar progress__bar--Feed"
                onClick={todayFeedHandler}
              >
                {props.userData.feedTarget ? (
                  <p> 오늘의 피드 </p>
                ) : (
                  <p> 뉴스 피드 습관을 설정하세요</p>
                )}
              </div>
              <div className="checked__today">
                {isTodayFeed ? (
                  <FontAwesomeIcon icon={faSquareCheck} />
                ) : (
                  <FontAwesomeIcon icon={faSquare} />
                )}
              </div>
            </div>
            <button className="button__goal">
              <Link to={"/mygoals"}>Set Target</Link>
            </button>
          </div>
        )}
        <div className="container__contact">
          <div className="contact__text">
            Contact
            <div className="contact__info">
              <p>
                <FontAwesomeIcon icon={faEnvelope} /> {props.userData.contact}
              </p>
            </div>
          </div>
          <div>
            <a href={`${props.userData.github}`}>
              <img src={github} className="sticker__github" alt="github Icon" />
            </a>
            <a href={`${props.userData.blog}`}>
              <img src={tistory} className="sticker__tistory" alt="" />
            </a>
          </div>
        </div>
        <div className="platform-address"></div>
      </div>
      {/*  */}
    </SProfile>
  );
};

export default MyProfile;
