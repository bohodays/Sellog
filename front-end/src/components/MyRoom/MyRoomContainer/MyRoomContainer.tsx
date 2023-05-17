import React, { Suspense, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SMyRoom } from "./styles";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { CineonToneMapping, PCFSoftShadowMap, sRGBEncoding } from "three";
// import { IMyRoomProps } from "@/typeModels/MyRoom/myRoomInterfaces";
import { IMyRoomProps } from "@/typeModels/MyRoom/MyroomInterfaces";
import { Room1 } from "../Models/Room1";
import { Room3 } from "../Models/Room3";
import { Room4 } from "../Models/Room4";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  itemTargetState,
  itemsHeightState,
  myItemsState,
} from "@/recoil/myroom/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import pMinDelay from "p-min-delay";
import Room2 from "../Models/Room2";
import { IUpdateMyRoom, apiUpdateMyRoom } from "@/api/room";
import Loading from "@/pages/Loading/Loading";

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
  deleteButtonRef,
  goBackButtonRef,
}: any) => {
  const { gl, camera } = useThree();
  gl.outputEncoding = sRGBEncoding;
  gl.toneMapping = CineonToneMapping;
  gl.toneMappingExposure = 1.75;
  gl.shadowMap.enabled = true;
  gl.shadowMap.type = PCFSoftShadowMap;
  gl.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // if (activePage === "myitems") {
  //   camera.position.x = 30.609999999999996;
  //   camera.position.y = 33.06;
  //   camera.position.z = 30.61;
  // }

  return (
    <>
      <Suspense fallback={<Loading />}>
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
        {/* <Room2 /> */}
        <Room3 />
        {/* <Room4 /> */}

        {/* 방에 있는 아이템 */}
        <RoomEditContainer
          activePage={activePage}
          upButtonRef={upButtonRef}
          downButtonRef={downButtonRef}
          editButtonRef={editButtonRef}
          rotationLeftButtonRef={rotationLeftButtonRef}
          rotationRigthButtonRef={rotationRigthButtonRef}
          deleteButtonRef={deleteButtonRef}
          goBackButtonRef={goBackButtonRef}
        />
      </Suspense>
    </>
  );
};

const MyRoomContainer = (props: IMyRoomProps) => {
  const [target, setTarget] = useRecoilState(itemTargetState);

  const homeNavigator = useNavigate();
  const getOutHandler = () => {
    homeNavigator("/main");
    window.location.reload();
  };

  // const [target, setTarget] = useState(null);
  const editButtonRef = useRef<any>();
  const rotationLeftButtonRef = useRef<any>();
  const rotationRigthButtonRef = useRef<any>();
  const upButtonRef = useRef<any>();
  const downButtonRef = useRef<any>();
  const deleteButtonRef = useRef<any>();
  const goBackButtonRef = useRef<any>();

  const [myItems, setMyItems] = useRecoilState(myItemsState);
  const [itemsHeigth, setItemsHeight] = useRecoilState(itemsHeightState);

  const handleActivePage = () => {
    if (props.activePage === "myitems") {
      const apiRequesArray: any = [];
      myItems.forEach((item, i) => {
        const requestObj: any = {};
        requestObj["x"] = item.x;
        requestObj["y"] = itemsHeigth[i].y;
        requestObj["z"] = item.z;
        requestObj["rotation"] = itemsHeigth[i].rotation;
        requestObj["id"] = item.id;
        requestObj["roomId"] = item.roomId;
        requestObj["itemId"] = item.itemId;

        apiRequesArray.push(requestObj);
      });

      apiUpdateMyRoom(apiRequesArray);
    }

    props.setActivePage((prev: string) => {
      return prev === "myprofile" ? "myitems" : "myprofile";
    });
  };

  return (
    <SMyRoom activePage={props.activePage}>
      <Canvas shadows={true} gl={{ preserveDrawingBuffer: true }}>
        <OrbitControls
          maxPolarAngle={Math.PI / 2.8}
          minZoom={50}
          maxZoom={200}
          enableRotate={props.activePage === "myitems" ? true : true}
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
          deleteButtonRef={deleteButtonRef}
          goBackButtonRef={goBackButtonRef}
        />
      </Canvas>
      {props.isEdit ? null : (
        <button className="myitems__btn" onClick={handleActivePage}>
          My Items
        </button>
      )}
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
          <button ref={deleteButtonRef} className="myitem__delete">
            Delete
          </button>
        </>
      )}
      {props.activePage == "myitems" && (
        <button
          ref={goBackButtonRef}
          className="myitemsGoback__btn"
          onClick={handleActivePage}
        >
          Go Back
        </button>
      )}
      <FontAwesomeIcon
        icon={faRightFromBracket}
        className="goHome__button"
        onClick={getOutHandler}
      />
    </SMyRoom>
  );
};

export default MyRoomContainer;
