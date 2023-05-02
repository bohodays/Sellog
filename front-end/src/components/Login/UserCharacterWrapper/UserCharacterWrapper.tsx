import { Ilbuni } from "@/components/Main/Models/Ilbuni";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import React, { Suspense } from "react";
import { F1 } from "../Models/F1";
import { F2 } from "../Models/F2";
import { F3 } from "../Models/F3";
import { M1 } from "../Models/M1";
import { M2 } from "../Models/M2";
import { M3 } from "../Models/M3";

type ActiveType = {
  active: number;
};

const Scene = ({ active }: ActiveType) => {
  return (
    <Suspense>
      <ambientLight intensity={0.7} />
      {/* <Ilbuni /> */}
      {active === 0 ? (
        <F1 />
      ) : active === 1 ? (
        <F2 />
      ) : active === 2 ? (
        <F3 />
      ) : active === 3 ? (
        <M1 />
      ) : active === 4 ? (
        <M2 />
      ) : (
        <M3 />
      )}
      {/* <F1 /> */}
      <OrthographicCamera
        makeDefault={true}
        left={-(window.innerWidth / window.innerHeight)}
        right={window.innerWidth / window.innerHeight}
        top={1}
        bottom={-1}
        near={-1000}
        far={1000}
        zoom={1.2}
        position={[0, 0, 5]}
      />
    </Suspense>
  );
};

const UserCharacterWrapper = ({ active }: ActiveType) => {
  return (
    <>
      <Canvas shadows={true} gl={{ preserveDrawingBuffer: true }}>
        <OrbitControls
          enableZoom={false}
          enableRotate={true}
          // 쉬프트 마우스 왼쪽 이동 막는 기능
          enablePan={false}
        />
        <Scene active={active} />
      </Canvas>
    </>
  );
};

export default UserCharacterWrapper;
