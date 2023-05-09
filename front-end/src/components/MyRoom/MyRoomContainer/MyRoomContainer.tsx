import React, { Suspense, useEffect, useRef, useState } from "react";
import { SMyRoom } from "./styles";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { CineonToneMapping, PCFSoftShadowMap, sRGBEncoding } from "three";
// import { IMyRoomProps } from "@/typeModels/MyRoom/myRoomInterfaces";
import { IMyRoomProps } from "@/typeModels/MyRoom/MyroomInterfaces";
import { Room1 } from "../Models/Room1";
import { Room2 } from "../Models/Room2";
import { Room3 } from "../Models/Room3";
import { Room4 } from "../Models/Room4";
import { useRecoilState } from "recoil";
import { itemTargetState } from "@/recoil/myroom/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Loading from "@/components/Loading/Loading";
import pMinDelay from "p-min-delay";

const RoomEditContainer = React.lazy(
  () => import("@/components/MyRoom/RoomEditContainer/RoomEditContainer")
);

const Scene = ({
  activePage,
  upButtonRef,
  downButtonRef,
  editButtonRef,
  rotationLeftButtonRef,
  rotationRigthButtonRef,
}: any) => {
  const { gl, camera } = useThree();
  gl.outputEncoding = sRGBEncoding;
  gl.toneMapping = CineonToneMapping;
  gl.toneMappingExposure = 1.75;
  gl.shadowMap.enabled = true;
  gl.shadowMap.type = PCFSoftShadowMap;
  gl.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  if (activePage === "myitems") {
    camera.position.x = 30.609999999999996;
    camera.position.y = 33.06;
    camera.position.z = 30.61;
  }

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

        {/* 방 테마 */}
        {/* <Room1 /> */}
        <Room2 />
        {/* <Room3 /> */}
        {/* <Room4 /> */}

        {/* 방에 있는 아이템 */}
        <RoomEditContainer
          activePage={activePage}
          upButtonRef={upButtonRef}
          downButtonRef={downButtonRef}
          editButtonRef={editButtonRef}
          rotationLeftButtonRef={rotationLeftButtonRef}
          rotationRigthButtonRef={rotationRigthButtonRef}
        />
      </Suspense>
    </>
  );
};

const MyRoomContainer = (props: IMyRoomProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const [target, setTarget] = useRecoilState(itemTargetState);

  // const [target, setTarget] = useState(null);
  const editButtonRef = useRef<any>();
  const rotationLeftButtonRef = useRef<any>();
  const rotationRigthButtonRef = useRef<any>();
  const upButtonRef = useRef<any>();
  const downButtonRef = useRef<any>();

  const handleActivePage = () => {
    props.setActivePage((prev: string) => {
      return prev === "myprofile" ? "myitems" : "myprofile";
    });
  };

  console.log(target);

  return (
    <SMyRoom activePage={props.activePage}>
      <Canvas shadows={true} gl={{ preserveDrawingBuffer: true }}>
        <OrbitControls
          maxPolarAngle={Math.PI / 2.8}
          minZoom={50}
          maxZoom={200}
          enableRotate={props.activePage === "myitems" ? false : true}
          // 쉬프트 마우스 왼쪽 이동 막는 기능
          enablePan={false}
        />
        <Scene
          activePage={props.activePage}
          upButtonRef={upButtonRef}
          downButtonRef={downButtonRef}
          editButtonRef={editButtonRef}
          rotationLeftButtonRef={rotationLeftButtonRef}
          rotationRigthButtonRef={rotationRigthButtonRef}
        />
      </Canvas>
      <button className="myitems__btn" onClick={handleActivePage}>
        My Items
      </button>
      {target && (
        <>
          <button ref={upButtonRef} className="myitem__up">
            Up
          </button>
          <button ref={downButtonRef} className="myitem__down">
            Down
          </button>
          <div className="myitem__rotation">
            <button ref={rotationLeftButtonRef}>
              <FontAwesomeIcon
                className="rotation__button-icon"
                icon={faCaretLeft}
              />
            </button>
            <p>Rotation</p>
            <button ref={rotationRigthButtonRef}>
              <FontAwesomeIcon
                className="rotation__button-icon"
                icon={faCaretRight}
              />
            </button>
          </div>
          <button className="myitem__delete">Delete</button>
        </>
      )}
      {props.activePage == "myitems" && (
        <button className="myitemsGoback__btn" onClick={handleActivePage}>
          Go Back
        </button>
      )}
    </SMyRoom>
  );
};

export default MyRoomContainer;
