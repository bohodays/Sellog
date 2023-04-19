import React, { Suspense } from "react";
import LoginModel from "../../components/Login/Models/LoginModel";
import CameraAndLight from "../../components/Login/Models/CameraAndLight";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SMain } from "./styles";

const Scene = () => {
  return (
    <>
      <Suspense>
        <ambientLight intensity={0.3} />
        {/* 카메라와 빛 제외한 mesh */}
        <LoginModel />
        {/* 카메라와 빛 */}
        <CameraAndLight />
      </Suspense>
    </>
  );
};

const Login = () => {
  return (
    <SMain>
      <Canvas shadows={true} gl={{ preserveDrawingBuffer: true }}>
        <OrbitControls
          maxPolarAngle={Math.PI / 2.8}
          minZoom={80}
          maxZoom={200}
          // 쉬프트 마우스 왼쪽 이동 막는 기능
          enablePan={false}
        />
        <Scene />
      </Canvas>
    </SMain>
  );
};

export default Login;
