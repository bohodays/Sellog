import { Characters } from "@/components/Main/Models/Character";
import { Ilbuni } from "@/components/Main/Models/Ilbuni";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import React, { Suspense } from "react";

const Scene = () => {
  return (
    <Suspense>
      <ambientLight intensity={0.7} />
      {/* <Ilbuni /> */}
      <Characters />
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

const UserCharacterWrapper = () => {
  return (
    <>
      <Canvas shadows={true} gl={{ preserveDrawingBuffer: true }}>
        <OrbitControls
          enableZoom={false}
          enableRotate={true}
          // 쉬프트 마우스 왼쪽 이동 막는 기능
          enablePan={false}
        />
        <Scene />
      </Canvas>
    </>
  );
};

export default UserCharacterWrapper;
