import { SProfile } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import profilePic from "@/assets/imgs/retro/profilePic.jpeg";
import github from "@/assets/imgs/retro/github.png";
import tistory from "@/assets/imgs/retro/tistoryIcon.png";
import smileBottom from "@/assets/imgs/retro/smile_bottom.png";
import coin from "@/assets/imgs/retro/coin.png";
const MyProfile = () => {
  return (
    <SProfile>
      <div className="head"> About me</div>
      <img className="sticker__smilebottom" src={smileBottom} alt="" />
      <div className="profile__body">
        <div className="container__userinfo">
          <img src={profilePic} alt="profile pic" />
          <div>
            <p className="username">Kim Do Hyun</p>
            <p>
              {" "}
              <img className="sticker__coin" src={coin} alt="coin" /> 5700
            </p>
          </div>
        </div>
        <p>어제의 내가 오늘의 나를 만든다.</p>
        <hr />
        <div className="container__habit">
          <div className="container__habit-stats">
            github{" "}
            <div className="progress__bar progress__bar--github">1일 1커밋</div>
          </div>
          <div className="container__habit-stats">
            blog{" "}
            <div className="progress__bar progress__bar--blog">1일 1포스팅</div>
          </div>
          <div className="container__habit-stats">
            algorithm{" "}
            <div className="progress__bar progress__bar--algorithm">
              1일 1알고
            </div>
          </div>
          <div className="container__habit-stats">
            CS
            <div className="progress__bar progress__bar--CS">
              오늘의 CS 풀기
            </div>
          </div>

          <div className="container__habit-stats">
            Feed
            <div className="progress__bar progress__bar--Feed">오늘의 피드</div>
          </div>
          <button className="">목표설정</button>
        </div>
        <div className="container__contact">
          <div className="contact__text">Contact</div>
          <div className="contact__info">
            <p>
              <FontAwesomeIcon icon={faEnvelope} />
              sjsj@gmail.com
            </p>
            <br />
          </div>
        </div>
        <div className="platform-address">
          <div>
            <img src={github} className="sticker__github" alt="github Icon" />
            <img src={tistory} className="sticker__tistory" alt="" />
          </div>
          <button>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
      </div>
    </SProfile>
  );
};

export default MyProfile;
