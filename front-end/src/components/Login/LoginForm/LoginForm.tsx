import React from "react";
import { SSection } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Tistory from "../../../assets/imgs/tistory_logo.png";

const LoginForm = ({ isVisible }: any) => {
  return (
    <SSection isVisible={isVisible}>
      <div className="button__wrapper">
        <h1>서비스 이름</h1>
        <div>
          <button className="github">
            <FontAwesomeIcon className="icon" icon={faGithub} />
            <span>깃허브로 로그인하기</span>
          </button>
          <button className="tistory">
            <img
              className="icon__tistory"
              src={Tistory}
              alt="티스토리 아이콘"
            />
            <span>티스토리로 로그인하기</span>
          </button>
        </div>
      </div>
    </SSection>
  );
};

export default LoginForm;
