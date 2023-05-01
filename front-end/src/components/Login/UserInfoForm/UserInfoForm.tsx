// import React from 'react'
import {
  TiChevronRight,
  TiChevronLeft,
  TiChevronLeftOutline,
  TiChevronRightOutline,
} from "react-icons/ti";
import { SSection } from "./styles";
import { Ilbuni } from "@/components/Main/Models/Ilbuni";
import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import UserCharacter from "../UserCharacter/UserCharacter";

const UserInfoForm = () => {
  const [active, setActive] = useState<number>(0);
  const [name, setName] = useState<string>();
  const [introduce, setIntroduce] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [github, setGithub] = useState<string>();
  const [blog, setBlog] = useState<string>();

  const handleLeftActive = () => {
    if (active > 0) setActive((prev) => prev - 1);
  };

  const handleRightActive = () => {
    if (active < 5) setActive((prev) => prev + 1);
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
            <div className="input__wrapper name">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="input-name"
                placeholder="이름을 입력해주세요."
              />
            </div>
            <div className="input__wrapper introduce">
              <input
                value={introduce}
                onChange={(e) => setIntroduce(e.target.value)}
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
                type="text"
                className="input-blog"
                placeholder="블로그 주소를 입력해주세요. (선택사항)"
              />
            </div>
            <button className="button-submit">완료</button>
          </div>
        </div>
      </div>
    </SSection>
  );
};

export default UserInfoForm;
