import { Suspense } from "react";
import { SMyRoom } from "./styles";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { CineonToneMapping, PCFSoftShadowMap, sRGBEncoding } from "three";
import { MyRoomProps } from "@/typeModels/MyRoom/myroomInterfaces";
import { Room1 } from "../Models/Room1";
import { Room2 } from "../Models/Room2";
import { Room3 } from "../Models/Room3";
import { Room15 } from "../Models/Room15";

const Scene = () => {
  const { gl } = useThree();
  gl.outputEncoding = sRGBEncoding;
  gl.toneMapping = CineonToneMapping;
  gl.toneMappingExposure = 1.75;
  gl.shadowMap.enabled = true;
  gl.shadowMap.type = PCFSoftShadowMap;
  gl.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  return (
    <>
      <Suspense>
        <ambientLight color={"#ffffff"} intensity={0.7} />
        <directionalLight
          color={"#ffffff"}
          intensity={1}
          position={[1.5, 7, 3]}
          castShadow={true}
          shadow-camera-far={20}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-normalBias={0.05}
        />
        {/* <Room1 /> */}
        {/* <Room2 /> */}
        {/* <Room3 /> */}
        <Room15 />
      </Suspense>
    </>
  );
};

const MyRoomContainer = (props: MyRoomProps) => {
  return (
    <SMyRoom activePage={props.activePage}>
      <Canvas shadows={true} gl={{ preserveDrawingBuffer: true }}>
        <OrbitControls
          maxPolarAngle={Math.PI / 2.8}
          minZoom={50}
          maxZoom={200}
          // 쉬프트 마우스 왼쪽 이동 막는 기능
          enablePan={false}
        />
        <Scene />
      </Canvas>
    </SMyRoom>
  );
};

export default MyRoomContainer;
