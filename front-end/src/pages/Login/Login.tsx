import React, { Suspense, useRef, useState } from "react";
import LoginModel from "../../components/Login/Models/LoginModel";
import CameraAndLight from "../../components/Login/Models/CameraAndLight";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SMain } from "./styles";
import LoginForm from "@/components/Login/LoginForm/LoginForm";
import { Room1 } from "@/components/MyRoom/Models/Room1";

export type handlerType = {
  handler: () => void;
};

const Scene = ({ handler }: handlerType) => {
  return (
    <>
      <Suspense>
        <ambientLight intensity={0.3} />
        {/* 카메라와 빛 제외한 mesh */}
        <LoginModel handler={handler} />
        {/* 카메라와 빛 */}
        <CameraAndLight />
      </Suspense>
    </>
  );
};

const Login = () => {
  const [isVisible, setVisible] = useState(false);

  const handleClassNameToggle = () => {
    setVisible(!isVisible);
  };

  return (
    <SMain>
      <div className="info">Please click on the game console.</div>

      {/* 로그인 폼 */}
      <LoginForm isVisible={isVisible} />

      <Canvas shadows={true} gl={{ preserveDrawingBuffer: true }}>
        <OrbitControls
          maxPolarAngle={Math.PI / 2.8}
          minZoom={80}
          maxZoom={200}
          // 쉬프트 마우스 왼쪽 이동 막는 기능
          enablePan={false}
        />
        <Scene handler={handleClassNameToggle} />
      </Canvas>
    </SMain>
  );
};

export default Login;
