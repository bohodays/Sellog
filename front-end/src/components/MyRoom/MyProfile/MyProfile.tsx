import { SProfile } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck, faSquare } from "@fortawesome/free-regular-svg-icons";
import profilePic from "@/assets/imgs/retro/profilePic.jpeg";
import github from "@/assets/imgs/retro/github.png";
import tistory from "@/assets/imgs/retro/tistoryIcon.png";
import smileBottom from "@/assets/imgs/retro/smile_bottom.png";
import coin from "@/assets/imgs/retro/coin.png";
import { useRef, useState } from "react";
import { Link, Router } from "react-router-dom";
interface MyProfileProps {
  userData: any;
  setUserData: any;
  setIsEdit: any;
  isEdit: boolean;
}

const MyProfile = (props: MyProfileProps) => {
  const profileImg: any = useRef(props.userData.img);
  const [newProfileImg, setNewProfileImg] = useState(profileImg.current);
  // console.log(props.userData.img, "component");

  const isSolvedQuiz = false;

  // 프로필 사진 바꾸는 로직
  function profileHandler() {
    console.log("profileHandler??", typeof profileImg);
    profileImg.current.click();
  }
  const onChange: any = (e: any) => {
    console.log(e.target.value);
    if (e.target.value) {
      const newImg: any = URL.createObjectURL(e.target.value);
      const blob = new Blob([newImg], { type: "text/plain" });
      console.log(blob, "!!!!!!!!!!!");
      // setNewProfileImg(blob);
      // setUserData(...userData, userData.img : e.target.value);
    } else {
      console.log(profilePic);
      // setNewProfileImg(profilePic);

      // setUserData(profilePic);
    }
  };

  // 유저 개인정보 수정하는 함수
  const userInfoHandler = () => {
    // console.log("user info handler");
    props.setIsEdit(!props.isEdit);
  };

  const csQuizHandler = () => {};

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
              onClick={profileHandler}
            />
          </label>
          <input
            type="file"
            style={{ display: "none" }}
            accept="image/jpg,impge/png,image/jpeg"
            name="profile_img"
            onChange={onChange}
            ref={profileImg}
          />
          <div className="container__userinfo">
            <p className="username">{props.userData.nickname}</p>
            <div className="point__container">
              <img className="sticker__coin" src={coin} alt="coin" />
              <p>1000</p>
            </div>
          </div>
        </div>
        <div className="bottom__profile">
          <p>{props.userData.motto}</p>
          <FontAwesomeIcon icon={faPenToSquare} onClick={userInfoHandler} />
        </div>
        <hr />
        <div className="container__habit">
          Today
          <div className="container__habit-stats">
            github
            <div className="progress__bar progress__bar--github">1일 1커밋</div>
            <div className="checked__today">
              <FontAwesomeIcon icon={faSquareCheck} />
              {/* <FontAwesomeIcon icon={faSquare} /> */}
            </div>
          </div>
          <div className="container__habit-stats">
            blog
            <div className="progress__bar progress__bar--blog">
              {props.userData.blogTarget}
            </div>
            <div className="checked__today">
              <FontAwesomeIcon icon={faSquareCheck} />
              {/* <FontAwesomeIcon icon={faSquare} /> */}
            </div>
          </div>
          <div className="container__habit-stats">
            algorithm
            <div className="progress__bar progress__bar--algorithm">
              {props.userData.bojTarget}
            </div>
            <div className="checked__today">
              <FontAwesomeIcon icon={faSquareCheck} />
              {/* <FontAwesomeIcon icon={faSquare} /> */}
            </div>
          </div>
          <div className="container__habit-stats">
            CS
            <div className="progress__bar progress__bar--CS">
              오늘의 CS 풀기
            </div>
            <div className="checked__today">
              <FontAwesomeIcon icon={faSquare} />
              {/* <FontAwesomeIcon icon={faSquareCheck} /> */}
            </div>
          </div>
          <div className="container__habit-stats">
            Feed
            <div className="progress__bar progress__bar--Feed">오늘의 피드</div>
            <div className="checked__today">
              <FontAwesomeIcon icon={faSquareCheck} />
              {/* <FontAwesomeIcon icon={faSquareCheck} /> */}
            </div>
          </div>
          <button className="button__goal">
            <Link to={"/mygoals"}>Set Target</Link>
          </button>
        </div>
        <div className="container__contact">
          <div className="contact__text">Contact</div>
          <div className="contact__info">
            <p>
              <FontAwesomeIcon icon={faEnvelope} /> {props.userData.contact}
            </p>
            <br />
          </div>
        </div>
        <div className="platform-address">
          <div>
            <a href={`${props.userData.github}`}>
              <img src={github} className="sticker__github" alt="github Icon" />
            </a>
            <a href={`${props.userData.tistory}`}>
              <img src={tistory} className="sticker__tistory" alt="" />
            </a>
          </div>
        </div>
      </div>
    </SProfile>
  );
};

export default MyProfile;
