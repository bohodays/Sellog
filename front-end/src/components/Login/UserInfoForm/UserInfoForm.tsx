// import React from 'react'
import {
  TiChevronRight,
  TiChevronLeft,
  TiChevronLeftOutline,
  TiChevronRightOutline,
} from "react-icons/ti";
import { SSection } from "./styles";
import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import UserCharacter from "../UserCharacter/UserCharacter";
import { apiUpdateUserSignupInfo } from "@/api/user";
import { useNavigate } from "react-router-dom";

type UserInformType = {
  userId: number;
};

const UserInfoForm = ({ userId }: UserInformType) => {
  const [active, setActive] = useState<number>(0);
  const [nickname, setNickname] = useState<string>();
  const [motto, setMotto] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [github, setGithub] = useState<string>();
  const [blog, setBlog] = useState<string>();

  const navigate = useNavigate();

  const handleLeftActive = () => {
    if (active > 0) setActive((prev) => prev - 1);
    console.log(active);
  };

  const handleRightActive = () => {
    if (active < 5) setActive((prev) => prev + 1);
    console.log(active);
  };

  const handleUpdateUserInfo = () => {
    if (nickname && motto) {
      const data = {
        userId,
        nickname,
        contact: email,
        motto,
        characterId: active,
        github,
        blog,
      };
      apiUpdateUserSignupInfo(data).then((res) => {
        console.log(res);

        navigate("/main");
      });
    }
  };

  return (
    <SSection>
      <div className="button__wrapper">
        <div className="left-wrapper">
          <div className="character__select">
            <UserCharacter
              active={active}
              handleLeftActive={handleLeftActive}
              handleRightActive={handleRightActive}
            />
          </div>
          <div className="right-wapper">
            <div className="input__wrapper nickname">
              <input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                type="text"
                className="input-nickname"
                placeholder="이름을 입력해주세요."
              />
            </div>
            <div className="input__wrapper motto">
              <input
                value={motto}
                onChange={(e) => setMotto(e.target.value)}
                type="text"
                className="input-nintroduceame"
                placeholder="한 문장으로 나를 표현해주세요."
              />
            </div>
            <div className="input__wrapper email">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="input-email"
                placeholder="이메일을 입력해주세요. (선택사항)"
              />
            </div>
            <div className="input__wrapper github">
              <input
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                type="text"
                className="input-github"
                placeholder="깃허브 주소를 입력해주세요. (선택사항)"
              />
            </div>
            <div className="input__wrapper blog">
              <input
                value={blog}
                onChange={(e) => setBlog(e.target.value)}
                type="text"
                className="input-blog"
                placeholder="블로그 주소를 입력해주세요. (선택사항)"
              />
            </div>
            <button className="button-submit" onClick={handleUpdateUserInfo}>
              완료
            </button>
          </div>
        </div>
      </div>
    </SSection>
  );
};

export default UserInfoForm;
