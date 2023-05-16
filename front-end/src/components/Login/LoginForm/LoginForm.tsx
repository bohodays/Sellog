import React from "react";
import { SSection } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import MainLogo from "@/assets/imgs/retro/smile_computer.png";

type PropsType = {
  isVisible: boolean;
};

const LoginForm = ({ isVisible }: PropsType) => {
  const SOCIAL_LOGIN_URL = "https://k8a404.p.ssafy.io";

  return (
    <SSection isVisible={isVisible}>
      <div className="button__wrapper">
        <img src={MainLogo} alt="logo"></img>
        <h1>Sellog</h1>
        <div>
          <button
            className="github"
            onClick={() =>
              (window.location.href = `${SOCIAL_LOGIN_URL}/oauth2/authorization/github`)
            }
          >
            <FontAwesomeIcon className="icon" icon={faGithub} />
            <span>깃허브로 로그인하기</span>
          </button>
          {/* <button
            className="tistory"
            onClick={() =>
              (window.location.href = `/oauth2/authorization/tistory`)
            }
          >
            <img
              className="icon__tistory"
              src={Tistory}
              alt="티스토리 아이콘"
            />
            <span>티스토리로 로그인하기</span>
          </button> */}
        </div>
      </div>
    </SSection>
  );
};

export default LoginForm;
