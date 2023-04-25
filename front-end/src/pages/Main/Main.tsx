// import React from 'react'

import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { SMain } from "./styles";
import { RepeatWrapping } from "three";
import { Ilbuni } from "@/components/Main/Models/Ilbuni";
import GridImg from "../../assets/imgs/main/grid.png";

const Scene = () => {
  const floorTexture = useTexture(GridImg);
  floorTexture.wrapS = RepeatWrapping;
  floorTexture.wrapT = RepeatWrapping;
  floorTexture.repeat.x = 10;
  floorTexture.repeat.y = 10;
  console.log(floorTexture);

  return (
    <Suspense>
      <ambientLight color={"white"} intensity={0.7} />
      <mesh name="floor" rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeBufferGeometry args={[100, 100]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>
      <Ilbuni position={[0, 0.3, 0]} name="ilbuni" />
    </Suspense>
  );
};

const Main = () => {
  return (
    <SMain>
      <Canvas shadows={true} gl={{ preserveDrawingBuffer: true }}>
        <OrbitControls
          enableRotate={false}
          enableZoom={false}
          // 쉬프트 마우스 왼쪽 이동 막는 기능
          enablePan={false}
        />
        <Scene />
      </Canvas>
    </SMain>
  );
};

export default Main;
