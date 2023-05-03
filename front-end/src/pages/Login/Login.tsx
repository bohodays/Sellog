import React, { Suspense, useEffect, useRef, useState } from "react";
import LoginModel from "../../components/Login/Models/LoginModel";
import CameraAndLight from "../../components/Login/Models/CameraAndLight";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SMain } from "./styles";
import LoginForm from "@/components/Login/LoginForm/LoginForm";
import UserInfoForm from "@/components/Login/UserInfoForm/UserInfoForm";
import { useRecoilState } from "recoil";
import { loginState } from "@/recoil/user/atom";
import { useLocation } from "react-router-dom";
import { apiGetUserInfo } from "@/api/user";
import { localData } from "@/utils/token";
import { userInfoState } from "@/recoil/myroom/atoms";

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
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [isVisible, setVisible] = useState(false);

  const location = useLocation();
  const userInfoUpdate = location.state?.userInfoUpdate;
  const userId = location.state?.userId;

  const handleClassNameToggle = () => {
    setVisible(!isVisible);
  };

  console.log(userInfoUpdate, "유저 정보 업데이트 상태");

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    const accessToken = localData.getAccessToken();
    if (accessToken) {
      apiGetUserInfo().then((res) => {
        setUserInfo(res?.data.response);
        console.log(res?.data.response);
      });
    }
  }, []);

  return (
    <SMain>
      {!isLoggedIn && (
        <div className="info">Please click on the game console.</div>
      )}

      {/* 유저 정보 입력 폼 */}
      {userInfoUpdate ? (
        <UserInfoForm userId={userId} />
      ) : (
        <LoginForm isVisible={isVisible} />
      )}

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
