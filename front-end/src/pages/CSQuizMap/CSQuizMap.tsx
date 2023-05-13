// import React from 'react'
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { localData } from "@/utils/token";

import {
  useGLTF,
  useAnimations,
  PerspectiveCamera,
  useTexture,
  Line,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState, useCallback } from "react";
import { SButtonWrapper, SMain, SSection } from "./styles";
import { PCFSoftShadowMap, RepeatWrapping, Vector2, Vector3 } from "three";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { F1_Main } from "@/components/Main/Models/F1_Main";
import { useNavigate } from "react-router-dom";
import { F2_Main } from "@/components/Main/Models/F2_Main";
import { F3_Main } from "@/components/Main/Models/F3_Main";
import { M2_Main } from "@/components/Main/Models/M2_Main";
import { M1_Main } from "@/components/Main/Models/M1_Main";
import { M3_Main } from "@/components/Main/Models/M3_Main";
import { useRecoilState } from "recoil";
import { userInfoState } from "@/recoil/myroom/atoms";
import { F1_CS } from "@/components/CSQuizMap/CharacterModels/F1_CS";
import { F2_CS } from "@/components/CSQuizMap/CharacterModels/F2_CS";
import { F3_CS } from "@/components/CSQuizMap/CharacterModels/F3_CS";
import { M1_CS } from "@/components/CSQuizMap/CharacterModels/M1_CS";
import { M2_CS } from "@/components/CSQuizMap/CharacterModels/M2_CS";
import { M3_CS } from "@/components/CSQuizMap/CharacterModels/M3_CS";
import { F1 } from "@/components/Login/Models/F1";
import { F2 } from "@/components/Login/Models/F2";
import { F3 } from "@/components/Login/Models/F3";
import { M1 } from "@/components/Login/Models/M1";
import { M2 } from "@/components/Login/Models/M2";
import { M3 } from "@/components/Login/Models/M3";
import { F1_Other } from "@/components/Login/Models/OtherModles/F1_Other";
import { F2_Other } from "@/components/Login/Models/OtherModles/F2_Other";
import { F3_Other } from "@/components/Login/Models/OtherModles/F3_Other";
import { M1_Other } from "@/components/Login/Models/OtherModles/M1_Other";
import { M2_Other } from "@/components/Login/Models/OtherModles/M2_Other";
import { M3_Other } from "@/components/Login/Models/OtherModles/M3_Other";
import GridImg from "../../assets/imgs/main/grid.png";
import { OMark } from "./Models/OMark";
import { XMark } from "./Models/XMark";
import { apiGetRoomId } from "@/api/csQuiz";

type GLTFResult = GLTF & {
  nodes: {
    f_1: THREE.SkinnedMesh;
    root: THREE.Bone;
    ["MCH-torsoparent"]: THREE.Bone;
  };
  materials: {
    characters: THREE.MeshStandardMaterial;
  };
};

type ActionName = "Idle" | "Run" | "Sad" | "Song Jump" | "Walk" | "Win";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

// matching, landing 상태에서 내 캐릭터가 보여지는 Scene
const SceneMyCharacter = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const myCharacterId = userInfo.characterId;

  return (
    <Suspense>
      <ambientLight intensity={0.7} />
      {myCharacterId === 0 ? (
        <F1_Other />
      ) : myCharacterId === 1 ? (
        <F2_Other />
      ) : myCharacterId === 2 ? (
        <F3_Other />
      ) : myCharacterId === 3 ? (
        <M1_Other />
      ) : myCharacterId === 4 ? (
        <M2_Other />
      ) : (
        <M3_Other />
      )}
    </Suspense>
  );
};

// matching, landing 상태에서 상대 캐릭터가 보여지는 Scene
const SceneOtherCharacter = ({ otherUser }: any) => {
  return (
    <Suspense>
      <ambientLight intensity={0.7} />
      {otherUser === 0 ? (
        <F1 />
      ) : otherUser === 1 ? (
        <F2 />
      ) : otherUser === 2 ? (
        <F3 />
      ) : otherUser === 3 ? (
        <M1 />
      ) : otherUser === 4 ? (
        <M2 />
      ) : otherUser === 5 ? (
        <M3 />
      ) : (
        ""
      )}
    </Suspense>
  );
};

let flag = false;

const Scene = ({
  buttonRef,
  send,
  otherUserModelRef1,
  otherUserModelRef2,
  otherUserModelRef3,
  otherUserModelRef4,
  otherUserModelRef5,
  otherUserModelRef6,
}: any) => {
  const group = useRef<THREE.Group | any>();
  const group1 = useRef<THREE.Group | any>();
  const group2 = useRef<THREE.Group | any>();
  const group3 = useRef<THREE.Group | any>();
  const group4 = useRef<THREE.Group | any>();
  const group5 = useRef<THREE.Group | any>();
  const group6 = useRef<THREE.Group | any>();
  const { nodes, materials, animations } = useGLTF(
    "/models/characters/f1.glb"
  ) as GLTFResult;

  const { actions } = useAnimations<GLTFActions | any>(animations, group);
  const actions1 = useAnimations<GLTFActions | any>(animations, group1);
  const actions2 = useAnimations<GLTFActions | any>(animations, group2);
  const actions3 = useAnimations<GLTFActions | any>(animations, group3);
  const actions4 = useAnimations<GLTFActions | any>(animations, group4);
  const actions5 = useAnimations<GLTFActions | any>(animations, group5);
  const actions6 = useAnimations<GLTFActions | any>(animations, group6);

  actions1.actions["Run"]?.play();
  actions2.actions["Run"]?.play();
  actions3.actions["Run"]?.play();
  actions4.actions["Run"]?.play();
  actions5.actions["Run"]?.play();
  actions6.actions["Run"]?.play();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const userModelRef = useRef<any>();
  const pointerRef = useRef<any>();

  // Texture
  const floorTexture = useTexture(GridImg);
  floorTexture.wrapS = RepeatWrapping;
  floorTexture.wrapT = RepeatWrapping;
  floorTexture.repeat.x = 5;
  floorTexture.repeat.y = 5;

  // Renderer
  const { gl, raycaster, clock, camera, scene } = useThree<any>();
  gl.setSize(window.innerWidth, window.innerHeight);
  gl.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  gl.shadowMap.enabled = true;
  gl.shadowMap.type = PCFSoftShadowMap;

  //raycaster
  let destinationPoint = new Vector3();
  let mouse = new Vector2();
  let angle = 0;
  let isPressed = false; // 마우스를 누르고 있는 상태
  let moving = false;

  // 카메라 위치
  const cameraPosition = new Vector3(0, 13, 10);
  camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
  camera.updateProjectionMatrix();

  function draw() {
    const delta = clock.getDelta();

    if (userModelRef.current?.mixer) {
      userModelRef.current?.mixer.update(delta);
    }

    if (otherUserModelRef1.current?.mixer) {
      otherUserModelRef1.current?.mixer.update(delta);
    }
    if (otherUserModelRef2.current?.mixer) {
      otherUserModelRef2.current?.mixer.update(delta);
    }
    if (otherUserModelRef3.current?.mixer) {
      otherUserModelRef3.current?.mixer.update(delta);
    }
    if (otherUserModelRef4.current?.mixer) {
      otherUserModelRef4.current?.mixer.update(delta);
    }
    if (otherUserModelRef5.current?.mixer) {
      otherUserModelRef5.current?.mixer.update(delta);
    }
    if (otherUserModelRef6.current?.mixer) {
      otherUserModelRef6.current?.mixer.update(delta);
    }

    if (userModelRef.current) {
      camera.lookAt(userModelRef.current.position);
    }

    if (userModelRef.current) {
      if (isPressed) {
        raycasting();
      }

      if (moving) {
        // 걸어가는 상태
        angle = Math.atan2(
          destinationPoint.z - userModelRef.current.position.z,
          destinationPoint.x - userModelRef.current.position.x
        );

        userModelRef.current.position.x += Math.cos(angle) * 0.08;
        userModelRef.current.position.z += Math.sin(angle) * 0.08;
        send(userModelRef.current.position.x, userModelRef.current.position.z);

        camera.position.x = cameraPosition.x + userModelRef.current.position.x;
        camera.position.z = cameraPosition.z + userModelRef.current.position.z;

        actions["Idle"]?.stop();
        actions["Run"]?.play();

        if (
          Math.abs(destinationPoint.x - userModelRef.current.position.x) <
            0.04 &&
          Math.abs(destinationPoint.z - userModelRef.current.position.z) < 0.03
        ) {
          moving = false;
          console.log("멈춤");
        }
      } else {
        actions["Run"]?.stop();
        actions["Idle"]?.play();
      }
    }

    gl.render(scene, camera);
    gl.setAnimationLoop(draw);
  }

  draw();

  function setSize() {
    camera.updateProjectionMatrix();
    gl.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener("resize", setSize);

  function checkIntersects() {
    const intersects = raycaster?.intersectObjects(scene.children);
    for (const item of intersects) {
      if (
        item.object.name === "floor" ||
        item.object.name === "OMark" ||
        item.object.name === "XMark" ||
        item.object.name === "line"
      ) {
        destinationPoint.x = item.point.x;
        destinationPoint.y = 0.3;
        destinationPoint.z = item.point.z;
        userModelRef.current.lookAt(destinationPoint);

        moving = true;

        pointerRef.current.position.x = destinationPoint.x;
        pointerRef.current.position.z = destinationPoint.z;
      }
      break;
    }
  }

  // 마우스 좌표를 three.js에 맞게 변환
  function calculateMousePosition(e: MouseEvent | Touch) {
    mouse.x = (e.clientX / gl.domElement.clientWidth) * 2 - 1;
    mouse.y = -((e.clientY / gl.domElement.clientHeight) * 2 - 1);
    // console.log(mouse.x + " : " + mouse.y);
  }

  // 변환된 마우스 좌표를 이용해 레이캐스팅
  function raycasting() {
    raycaster.setFromCamera(mouse, camera);
    checkIntersects();
  }

  // 마우스 이벤트
  gl.domElement.addEventListener("mousedown", (e: MouseEvent) => {
    isPressed = true;
    calculateMousePosition(e);
  });
  gl.domElement.addEventListener("mouseup", (e: MouseEvent) => {
    isPressed = false;
  });
  gl.domElement.addEventListener("touchmove", (e: TouchEvent) => {
    isPressed = false;
  });

  // 경계선
  const points = [new Vector3(0, 0, 10), new Vector3(0, 0, -10)];

  return (
    <Suspense>
      {/* 빛 */}
      <ambientLight color={"white"} intensity={0.8} />
      <directionalLight
        color={"white"}
        intensity={0.7}
        position={[1, 1, 1]}
        castShadow={true}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-camera-near={-100}
        shadow-camera-far={100}
      />
      {/* 카메라 */}
      <PerspectiveCamera makeDefault={true} far={1000} zoom={0.8} />

      {/* 경계선 */}
      <Line name="line" points={points} lineWidth={4} />

      {/* O 표시 */}
      <OMark />

      {/* X 표시 */}
      <XMark />

      {/* 맵 바닥 */}
      <mesh name="floor" rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true}>
        <planeGeometry args={[35, 20]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>
      {userInfo && userInfo!.characterId === 0 ? (
        <F1_Main userModelRef={userModelRef} group={group} />
      ) : userInfo && userInfo!.characterId === 1 ? (
        <F2_Main userModelRef={userModelRef} group={group} />
      ) : userInfo && userInfo!.characterId === 2 ? (
        <F3_Main userModelRef={userModelRef} group={group} />
      ) : userInfo && userInfo!.characterId === 3 ? (
        <M1_Main userModelRef={userModelRef} group={group} />
      ) : userInfo && userInfo!.characterId === 4 ? (
        <M2_Main userModelRef={userModelRef} group={group} />
      ) : (
        <M3_Main userModelRef={userModelRef} group={group} />
      )}

      <F1_CS otherUserModelRef1={otherUserModelRef1} group={group1} />
      <F2_CS otherUserModelRef={otherUserModelRef2} group={group2} />
      <F3_CS otherUserModelRef={otherUserModelRef3} group={group3} />
      <M1_CS otherUserModelRef={otherUserModelRef4} group={group4} />
      <M2_CS otherUserModelRef={otherUserModelRef5} group={group5} />
      <M3_CS otherUserModelRef={otherUserModelRef6} group={group6} />
      {/* 유저 캐릭터를 따라다니는 pointMesh */}
      <mesh
        ref={pointerRef}
        name="point"
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 0]}
        receiveShadow={true}
      >
        <circleGeometry args={[0.2, 32]} />
        <meshBasicMaterial color={"crimson"} transparent={true} opacity={0.5} />
      </mesh>
    </Suspense>
  );
};

const Main = () => {
  const navigate = useNavigate();
  const buttonRef = useRef<any>();

  const [client, setClient] = useState<Stomp.Client | null>(null);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  // const [landingTimer, setLandingTimer] = useState<number>(5);
  const landingTimerRef = useRef<HTMLSpanElement | any>(null);
  const accessToken = localData.getAccessToken();

  // 상대 유저 모델
  const otherUserModelRef1 = useRef<any>();
  const otherUserModelRef2 = useRef<any>();
  const otherUserModelRef3 = useRef<any>();
  const otherUserModelRef4 = useRef<any>();
  const otherUserModelRef5 = useRef<any>();
  const otherUserModelRef6 = useRef<any>();

  // matching, landing, start
  const [isState, setIsState] = useState("matching");

  // 소켓 연결
  useEffect(() => {
    const socket = new SockJS("https://k8a404.p.ssafy.io/real-time");
    const ws = Stomp.over(socket);

    ws.connect({ Authorization: `Bearer ${accessToken}` }, () => {
      setClient(ws);

      ws.subscribe(
        "/sub/1",
        (message) => {
          const received = JSON.parse(message.body);
          console.log({ received });

          if (received.sender !== userInfo.userId) {
            if (isState === "matching" && !flag) {
              setIsState("landing");
              setOtherUser(received.characterId);
            }
          }

          if (otherUserModelRef1.current) {
            if (received.sender !== userInfo.userId) {
              if (received.characterId === 0) {
                otherUserModelRef1.current.position.x = received.x;
                otherUserModelRef1.current.position.z = received.y;
                otherUserModelRef1.current.visible = true;
                // 왜 안되지...
                let otherDestinationPoint = new Vector3(
                  received.x,
                  0.03,
                  received.y
                );
                otherUserModelRef1.current.lookAt(otherDestinationPoint);
              } else if (received.characterId === 1) {
                otherUserModelRef2.current.position.x = received.x;
                otherUserModelRef2.current.position.z = received.y;
                otherUserModelRef2.current.visible = true;
              } else if (received.characterId === 2) {
                otherUserModelRef3.current.position.x = received.x;
                otherUserModelRef3.current.position.z = received.y;
                otherUserModelRef3.current.visible = true;
              } else if (received.characterId === 3) {
                otherUserModelRef4.current.position.x = received.x;
                otherUserModelRef4.current.position.z = received.y;
                otherUserModelRef4.current.visible = true;
              } else if (received.characterId === 4) {
                otherUserModelRef5.current.position.x = received.x;
                otherUserModelRef5.current.position.z = received.y;
                otherUserModelRef5.current.visible = true;
              } else if (received.characterId === 5) {
                otherUserModelRef6.current.position.x = received.x;
                otherUserModelRef6.current.position.z = received.y;
                otherUserModelRef6.current.visible = true;
              }
            }
          }
        },
        { Authorization: `Bearer ${accessToken}` }
      );
    });

    return () => {
      if (ws !== null) {
        ws.disconnect(() => {});
      }
    };
  }, []);

  function send(mouseX: number, mouseY: number) {
    const message = {
      roomId: "1",
      sender: userInfo.userId,
      x: mouseX,
      y: mouseY,
      characterId: userInfo.characterId,
      nickname: userInfo.nickname,
    };
    client?.send("/pub/1", {}, JSON.stringify(message));
  }

  useEffect(() => {
    if (isState === "landing") {
      const landingTimerInterval = setInterval(() => {
        if (landingTimerRef.current && landingTimerRef.current.innerText > 0) {
          landingTimerRef.current.innerText = (
            parseInt(landingTimerRef.current.innerText) - 1
          ).toString();
        } else if (landingTimerRef.current) {
          clearInterval(landingTimerInterval);
          flag = true;
          setIsState("start");
        }
      }, 1000);
      return () => clearInterval(landingTimerInterval);
    }
  }, [isState]);

  const [otherUser, setOtherUser] = useState<any>(null);

  return (
    <SMain>
      {isState === "matching" || isState === "landing" ? (
        <SSection>
          <div className="page-state__wrapper"></div>
          {isState === "matching" ? (
            <div className="page-state">Matching</div>
          ) : (
            <div ref={landingTimerRef} className="page-state">
              {5}
            </div>
          )}
          <div className="character__wrapper my-character">
            <Canvas>
              <SceneMyCharacter />
            </Canvas>
            <p className="my-character-name">{userInfo.nickname}</p>
          </div>
          <div className="character__wrapper other-character">
            <Canvas>
              <SceneOtherCharacter otherUser={otherUser} />
            </Canvas>
          </div>
        </SSection>
      ) : isState === "start" ? (
        <>
          <div className="quiz__wrapper">
            <p>찬휘는 천재다</p>
          </div>
          <Canvas
            style={{ background: "skyblue" }}
            shadows={true}
            gl={{ preserveDrawingBuffer: true }}
          >
            <Scene
              buttonRef={buttonRef}
              send={send}
              otherUserModelRef1={otherUserModelRef1}
              otherUserModelRef2={otherUserModelRef2}
              otherUserModelRef3={otherUserModelRef3}
              otherUserModelRef4={otherUserModelRef4}
              otherUserModelRef5={otherUserModelRef5}
              otherUserModelRef6={otherUserModelRef6}
            />
          </Canvas>
        </>
      ) : (
        ""
      )}
    </SMain>
  );
};

export default Main;
