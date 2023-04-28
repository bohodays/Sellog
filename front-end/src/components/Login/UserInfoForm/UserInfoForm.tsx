// import React from 'react'
import { TiChevronRight, TiChevronLeft } from "react-icons/ti";
import { SSection } from "./styles";
import { Ilbuni } from "@/components/Main/Models/Ilbuni";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Scene = () => {
  return (
    <Suspense>
      <ambientLight intensity={0.7} />
      <Ilbuni />
    </Suspense>
  );
};

const UserInfoForm = () => {
  return (
    <SSection>
      <div className="button__wrapper">
        <div className="left-wrapper">
          <div className="character__select">
            <div className="canvas__wrapper">
              <Canvas shadows={true} gl={{ preserveDrawingBuffer: true }}>
                <OrbitControls
                  // maxPolarAngle={Math.PI / 2.8}
                  // zoom0={20}
                  enableZoom={false}
                  enableRotate={true}
                  // minZoom={5}
                  // maxZoom={10}
                  // 쉬프트 마우스 왼쪽 이동 막는 기능
                  enablePan={false}
                />
                <Scene />
              </Canvas>
            </div>
            <div className="button-wrapper">
              <button className="nav left">
                <TiChevronLeft />
              </button>
              <button className="nav right">
                <TiChevronRight />
              </button>
            </div>
          </div>
          <div className="right-wapper">
            <div className="input__wrapper name">
              <input
                type="text"
                className="input-name"
                placeholder="이름을 입력해주세요."
              />
            </div>
            <div className="input__wrapper introduce">
              <input
                type="text"
                className="input-nintroduceame"
                placeholder="한 문장으로 나를 표현해주세요."
              />
            </div>
            <div className="input__wrapper email">
              <input
                type="text"
                className="input-email"
                placeholder="이메일을 입력해주세요. (선택사항)"
              />
            </div>
            <div className="input__wrapper github">
              <input
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
