import { Suspense, useEffect, useRef, useState } from "react";
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
import RoomEditContainer from "../RoomEditContainer/RoomEditContainer";
import { useRecoilState } from "recoil";
import { itemTargetState } from "@/recoil/myroom/atoms";

const Scene = ({
  // target,
  // setTarget,
  editButtonRef,
  rotationButtonRef,
}: any) => {
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

        {/* 방 테마 */}
        {/* <Room1 /> */}
        <Room2 />
        {/* <Room3 /> */}
        {/* <Room4 /> */}

        {/* 방에 있는 아이템 */}
        <RoomEditContainer
          // target={target}
          // setTarget={setTarget}
          editButtonRef={editButtonRef}
          rotationButtonRef={rotationButtonRef}
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
  const rotationButtonRef = useRef<any>();

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
          enableRotate={true}
          // 쉬프트 마우스 왼쪽 이동 막는 기능
          enablePan={false}
        />
        <Scene
          target={target}
          setTarget={setTarget}
          editButtonRef={editButtonRef}
          rotationButtonRef={rotationButtonRef}
        />
      </Canvas>
      <button className="myitems__btn" onClick={handleActivePage}>
        My Items
      </button>
      {/* {target && (
        <button
          ref={editButtonRef}
          className="myitem__edit"
          onClick={() => {
            if (!isEdit) {
              setIsEdit(true);
            }
          }}
        >
          Edit
        </button>
      )} */}
      {target && (
        <>
          <button ref={rotationButtonRef} className="myitem__rotation">
            Rotation
          </button>
          <button className="myitem__delete">Delete</button>
        </>
      )}
      {props.activePage == "myitems" && (
        <button className="myitemsGoback__btn" onClick={handleActivePage}>
          Go Back
        </button>
      )}

      {/* {isEdit && (
        <>
          <button
            className="myitem__complete"
            onClick={() => {
              if (isEdit) {
                setIsEdit(false);
              }
            }}
          >
            Complete
          </button>
        </>
      )} */}
    </SMyRoom>
  );
};

export default MyRoomContainer;
