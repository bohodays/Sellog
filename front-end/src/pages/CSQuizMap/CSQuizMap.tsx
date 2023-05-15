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
  OrbitControls,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState, useCallback } from "react";
import { SButtonWrapper, SMain, SSection } from "./styles";
import { PCFSoftShadowMap, RepeatWrapping, Vector2, Vector3 } from "three";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { F1_Main } from "@/components/Main/Models/F1_Main";
import { useLocation, useNavigate } from "react-router-dom";
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
import GridImg from "../../assets/imgs/main/grid.png";
import { OMark } from "./Models/OMark";
import { XMark } from "./Models/XMark";
import { gsap } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { apiGetOXQuiz } from "@/api/csQuiz";

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

let otherDestinationPoint = new Vector3();
otherDestinationPoint.y = 0.03;
let otherMoving = false;

const Scene = ({
  send,
  userModelRef,
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

  actions1.actions["Idle"]?.play();
  actions2.actions["Idle"]?.play();
  actions3.actions["Idle"]?.play();
  actions4.actions["Idle"]?.play();
  actions5.actions["Idle"]?.play();
  actions6.actions["Idle"]?.play();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const location = useLocation();
  const otherUserCharacterId = location.state.otherUserChracterId;
  const otherUserId = location.state.otherUserId;
  const isLeft = userInfo.userId - otherUserId;

  if (otherUserCharacterId === 0) {
    if (otherUserModelRef1.current) {
      otherUserModelRef1.current.visible = true;
    }
  } else if (otherUserCharacterId === 1) {
    if (otherUserModelRef2.current) {
      otherUserModelRef2.current.visible = true;
    }
  } else if (otherUserCharacterId === 2) {
    if (otherUserModelRef3.current) {
      otherUserModelRef3.current.visible = true;
    }
  } else if (otherUserCharacterId === 3) {
    if (otherUserModelRef4.current) {
      otherUserModelRef4.current.visible = true;
    }
  } else if (otherUserCharacterId === 4) {
    if (otherUserModelRef5.current) {
      otherUserModelRef5.current.visible = true;
    }
  } else if (otherUserCharacterId === 5) {
    if (otherUserModelRef6.current) {
      otherUserModelRef6.current.visible = true;
    }
  }

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
  let otherAngle = 0;
  let isPressed = false; // 마우스를 누르고 있는 상태
  let moving = false;

  // 카메라 위치
  let cameraPosition: THREE.Vector3;
  if (isLeft < 0) {
    cameraPosition = new Vector3(0, 13, 10);
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    camera.updateProjectionMatrix();
    camera.position.x -= 2;
  } else {
    cameraPosition = new Vector3(0, 13, 10);
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    camera.updateProjectionMatrix();
    camera.position.x += 2;
  }

  // let otherUserPosition: { x: number; y: number; z: number };
  // if (otherUserModelRef1.current) {
  //   otherUserPosition = {
  //     x: otherUserModelRef1.current.position.x,
  //     y: otherUserModelRef1.current.position.x,
  //     z: otherUserModelRef1.current.position.z,
  //   };
  // }

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

        userModelRef.current.position.x += Math.cos(angle) * 0.1;
        userModelRef.current.position.z += Math.sin(angle) * 0.1;
        // send(userModelRef.current.position.x, userModelRef.current.position.z);

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
        }
      } else {
        actions["Run"]?.stop();
        actions["Idle"]?.play();
      }
    }

    if (otherUserCharacterId === 0) {
      if (otherUserModelRef1.current) {
        if (otherMoving) {
          otherAngle = Math.atan2(
            otherDestinationPoint.z - otherUserModelRef1.current.position.z,
            otherDestinationPoint.x - otherUserModelRef1.current.position.x
          );

          actions1.actions["Run"]?.play();
          actions1.actions["Idle"]?.stop();

          otherUserModelRef1.current.position.x += Math.cos(otherAngle) * 0.1;
          otherUserModelRef1.current.position.z += Math.sin(otherAngle) * 0.1;

          if (
            Math.abs(
              otherDestinationPoint.x - otherUserModelRef1.current.position.x
            ) < 0.04 &&
            Math.abs(
              otherDestinationPoint.z - otherUserModelRef1.current.position.z
            ) < 0.03
          ) {
            otherMoving = false;
            actions1.actions["Run"]?.stop();
            actions1.actions["Idle"]?.play();
          }
        } else {
          actions1.actions["Run"]?.stop();
          actions1.actions["Idle"]?.play();
        }
      } else {
        actions1.actions["Run"]?.stop();
        actions1.actions["Idle"]?.play();
      }
    }

    if (otherUserCharacterId === 1) {
      if (otherUserModelRef2.current) {
        if (otherMoving) {
          otherAngle = Math.atan2(
            otherDestinationPoint.z - otherUserModelRef2.current.position.z,
            otherDestinationPoint.x - otherUserModelRef2.current.position.x
          );

          actions2.actions["Run"]?.play();
          actions2.actions["Idle"]?.stop();

          otherUserModelRef2.current.position.x += Math.cos(otherAngle) * 0.1;
          otherUserModelRef2.current.position.z += Math.sin(otherAngle) * 0.1;

          if (
            Math.abs(
              otherDestinationPoint.x - otherUserModelRef2.current.position.x
            ) < 0.04 &&
            Math.abs(
              otherDestinationPoint.z - otherUserModelRef2.current.position.z
            ) < 0.03
          ) {
            otherMoving = false;
            actions2.actions["Run"]?.stop();
            actions2.actions["Idle"]?.play();
          }
        } else {
          actions2.actions["Run"]?.stop();
          actions2.actions["Idle"]?.play();
        }
      } else {
        actions2.actions["Run"]?.stop();
        actions2.actions["Idle"]?.play();
      }
    }

    if (otherUserCharacterId === 2) {
      if (otherUserModelRef3.current) {
        if (otherMoving) {
          otherAngle = Math.atan2(
            otherDestinationPoint.z - otherUserModelRef3.current.position.z,
            otherDestinationPoint.x - otherUserModelRef3.current.position.x
          );

          actions3.actions["Run"]?.play();
          actions3.actions["Idle"]?.stop();

          otherUserModelRef3.current.position.x += Math.cos(otherAngle) * 0.1;
          otherUserModelRef3.current.position.z += Math.sin(otherAngle) * 0.1;

          if (
            Math.abs(
              otherDestinationPoint.x - otherUserModelRef3.current.position.x
            ) < 0.04 &&
            Math.abs(
              otherDestinationPoint.z - otherUserModelRef3.current.position.z
            ) < 0.03
          ) {
            otherMoving = false;
            actions3.actions["Run"]?.stop();
            actions3.actions["Idle"]?.play();
          }
        } else {
          actions3.actions["Run"]?.stop();
          actions3.actions["Idle"]?.play();
        }
      } else {
        actions3.actions["Run"]?.stop();
        actions3.actions["Idle"]?.play();
      }
    }

    if (otherUserCharacterId === 3) {
      if (otherUserModelRef4.current) {
        if (otherMoving) {
          otherAngle = Math.atan2(
            otherDestinationPoint.z - otherUserModelRef4.current.position.z,
            otherDestinationPoint.x - otherUserModelRef4.current.position.x
          );

          actions4.actions["Run"]?.play();
          actions4.actions["Idle"]?.stop();

          otherUserModelRef4.current.position.x += Math.cos(otherAngle) * 0.1;
          otherUserModelRef4.current.position.z += Math.sin(otherAngle) * 0.1;

          if (
            Math.abs(
              otherDestinationPoint.x - otherUserModelRef4.current.position.x
            ) < 0.04 &&
            Math.abs(
              otherDestinationPoint.z - otherUserModelRef4.current.position.z
            ) < 0.03
          ) {
            otherMoving = false;
            actions4.actions["Run"]?.stop();
            actions4.actions["Idle"]?.play();
          }
        } else {
          actions4.actions["Run"]?.stop();
          actions4.actions["Idle"]?.play();
        }
      } else {
        actions4.actions["Run"]?.stop();
        actions4.actions["Idle"]?.play();
      }
    }

    if (otherUserCharacterId === 4) {
      if (otherUserModelRef5.current) {
        if (otherMoving) {
          otherAngle = Math.atan2(
            otherDestinationPoint.z - otherUserModelRef5.current.position.z,
            otherDestinationPoint.x - otherUserModelRef5.current.position.x
          );

          actions5.actions["Run"]?.play();
          actions5.actions["Idle"]?.stop();

          otherUserModelRef5.current.position.x += Math.cos(otherAngle) * 0.1;
          otherUserModelRef5.current.position.z += Math.sin(otherAngle) * 0.1;

          if (
            Math.abs(
              otherDestinationPoint.x - otherUserModelRef5.current.position.x
            ) < 0.04 &&
            Math.abs(
              otherDestinationPoint.z - otherUserModelRef5.current.position.z
            ) < 0.03
          ) {
            otherMoving = false;
            actions5.actions["Run"]?.stop();
            actions5.actions["Idle"]?.play();
          }
        } else {
          actions5.actions["Run"]?.stop();
          actions5.actions["Idle"]?.play();
        }
      } else {
        actions5.actions["Run"]?.stop();
        actions5.actions["Idle"]?.play();
      }
    }
    if (otherUserCharacterId === 5) {
      if (otherUserModelRef6.current) {
        if (otherMoving) {
          otherAngle = Math.atan2(
            otherDestinationPoint.z - otherUserModelRef6.current.position.z,
            otherDestinationPoint.x - otherUserModelRef6.current.position.x
          );

          actions6.actions["Run"]?.play();
          actions6.actions["Idle"]?.stop();

          otherUserModelRef6.current.position.x += Math.cos(otherAngle) * 0.1;
          otherUserModelRef6.current.position.z += Math.sin(otherAngle) * 0.1;

          if (
            Math.abs(
              otherDestinationPoint.x - otherUserModelRef6.current.position.x
            ) < 0.04 &&
            Math.abs(
              otherDestinationPoint.z - otherUserModelRef6.current.position.z
            ) < 0.03
          ) {
            otherMoving = false;
            actions6.actions["Run"]?.stop();
            actions6.actions["Idle"]?.play();
          }
        } else {
          actions6.actions["Run"]?.stop();
          actions6.actions["Idle"]?.play();
        }
      } else {
        actions6.actions["Run"]?.stop();
        actions6.actions["Idle"]?.play();
      }
    }

    camera.updateProjectionMatrix();
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

        send(destinationPoint.x, destinationPoint.z);
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

  // useEffect(() => {
  //   if (userModelRef.current) {
  //     userModelRef.current.position.x += 2;
  //   }
  // }, []);

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
        <F1_Main isLeft={isLeft} userModelRef={userModelRef} group={group} />
      ) : userInfo && userInfo!.characterId === 1 ? (
        <F2_Main isLeft={isLeft} userModelRef={userModelRef} group={group} />
      ) : userInfo && userInfo!.characterId === 2 ? (
        <F3_Main isLeft={isLeft} userModelRef={userModelRef} group={group} />
      ) : userInfo && userInfo!.characterId === 3 ? (
        <M1_Main isLeft={isLeft} userModelRef={userModelRef} group={group} />
      ) : userInfo && userInfo!.characterId === 4 ? (
        <M2_Main isLeft={isLeft} userModelRef={userModelRef} group={group} />
      ) : (
        <M3_Main isLeft={isLeft} userModelRef={userModelRef} group={group} />
      )}

      <F1_CS
        isLeft={isLeft}
        otherUserModelRef1={otherUserModelRef1}
        group={group1}
      />
      <F2_CS
        isLeft={isLeft}
        otherUserModelRef={otherUserModelRef2}
        group={group2}
      />
      <F3_CS
        isLeft={isLeft}
        otherUserModelRef={otherUserModelRef3}
        group={group3}
      />
      <M1_CS
        isLeft={isLeft}
        otherUserModelRef={otherUserModelRef4}
        group={group4}
      />
      <M2_CS
        isLeft={isLeft}
        otherUserModelRef={otherUserModelRef5}
        group={group5}
      />
      <M3_CS
        isLeft={isLeft}
        otherUserModelRef={otherUserModelRef6}
        group={group6}
      />
      {/* 유저 캐릭터를 따라다니는 pointMesh */}
      <mesh
        ref={pointerRef}
        name="point"
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-2, 0.01, 0]}
        receiveShadow={true}
      >
        <circleGeometry args={[0.2, 32]} />
        <meshBasicMaterial transparent={true} opacity={0.5} />
      </mesh>
    </Suspense>
  );
};

const Main = () => {
  const navigate = useNavigate();
  const buttonRef = useRef<any>();

  const location = useLocation();
  const otherUserCharacterId = location.state.otherUserChracterId;
  const otherNickname = location.state.otherNickname || null;
  const quizList = location.state.quizList;

  const [client, setClient] = useState<Stomp.Client | null>(null);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  // 타이머
  const intervalRef = useRef<any>(null);
  const stageRef = useRef(0);
  const timerRef = useRef(0);
  const barRef = useRef<any>(null);
  const quizContentRef = useRef<any>(null);

  const accessToken = localData.getAccessToken();

  // 나와 유저의 정답 개수
  const myCorrectRef = useRef(0);
  const otherCorrectRef = useRef(0);

  const userModelRef = useRef<any>();

  // 상대 유저 모델
  const otherUserModelRef1 = useRef<any>();
  const otherUserModelRef2 = useRef<any>();
  const otherUserModelRef3 = useRef<any>();
  const otherUserModelRef4 = useRef<any>();
  const otherUserModelRef5 = useRef<any>();
  const otherUserModelRef6 = useRef<any>();

  if (otherUserModelRef1.current) {
    otherDestinationPoint.x = otherUserModelRef1.current.position.x;
    otherDestinationPoint.y = otherUserModelRef1.current.position.y;
    otherDestinationPoint.z = otherUserModelRef1.current.position.z;
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      timerRef.current += 1;
      if (timerRef.current > 10) {
        // 다시 타이머 되돌리기
        timerRef.current = 0;

        // 정답 체크하기
        if (quizList[stageRef.current].answer === "o") {
          // o에 위치한다면
          if (userModelRef.current.position.x < 0) myCorrectRef.current += 1;

          if (otherUserCharacterId === 0) {
            if (otherUserModelRef1.current.position.x < 0)
              otherCorrectRef.current += 1;
          } else if (otherUserCharacterId === 1) {
            if (otherUserModelRef2.current.position.x < 0)
              otherCorrectRef.current += 1;
          } else if (otherUserCharacterId === 2) {
            if (otherUserModelRef3.current.position.x < 0)
              otherCorrectRef.current += 1;
          } else if (otherUserCharacterId === 3) {
            if (otherUserModelRef4.current.position.x < 0)
              otherCorrectRef.current += 1;
          } else if (otherUserCharacterId === 4) {
            if (otherUserModelRef5.current.position.x < 0)
              otherCorrectRef.current += 1;
          } else if (otherUserCharacterId === 5) {
            if (otherUserModelRef6.current.position.x < 0)
              otherCorrectRef.current += 1;
          }
        } else if (quizList[stageRef.current].answer === "x") {
          // x에 위치한다면
          if (userModelRef.current.position.x > 0) myCorrectRef.current += 1;

          if (otherUserCharacterId === 0) {
            if (otherUserModelRef1.current.position.x > 0)
              otherCorrectRef.current += 1;
          } else if (otherUserCharacterId === 1) {
            if (otherUserModelRef2.current.position.x > 0)
              otherCorrectRef.current += 1;
          } else if (otherUserCharacterId === 2) {
            if (otherUserModelRef3.current.position.x > 0)
              otherCorrectRef.current += 1;
          } else if (otherUserCharacterId === 3) {
            if (otherUserModelRef4.current.position.x > 0)
              otherCorrectRef.current += 1;
          } else if (otherUserCharacterId === 4) {
            if (otherUserModelRef5.current.position.x > 0)
              otherCorrectRef.current += 1;
          } else if (otherUserCharacterId === 5) {
            if (otherUserModelRef6.current.position.x > 0)
              otherCorrectRef.current += 1;
          }
        }

        // 다음 문제 보여주기
        stageRef.current += 1;

        // 3이면 결과 페이지로 이동시키기
        if (stageRef.current === 3) {
          clearInterval(intervalRef.current);
          navigate("/csquiz-battle-result", {
            state: {
              myCorrect: myCorrectRef.current,
              otherCorrect: otherCorrectRef.current,
              otherUserCharacterId,
              otherNickname,
              quizList,
            },
          });
        }
        quizContentRef.current.innerText = quizList[stageRef.current].quest;
      } else {
        const percentage = ((11 - timerRef.current) / 11) * 100;
        barRef.current.style.width = `${percentage}%`;
      }
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  if (quizContentRef.current) {
    quizContentRef.current.innerText = quizList[stageRef.current].quest;
  }

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

          if (otherUserModelRef1.current) {
            if (received.sender !== userInfo.userId) {
              if (received.characterId === 0) {
                otherDestinationPoint.x = received.x;
                otherDestinationPoint.z = received.y;
                otherUserModelRef1.current.lookAt(otherDestinationPoint);
                otherMoving = true;
              } else if (received.characterId === 1) {
                otherDestinationPoint.x = received.x;
                otherDestinationPoint.z = received.y;
                otherUserModelRef2.current.lookAt(otherDestinationPoint);
                otherMoving = true;
              } else if (received.characterId === 2) {
                otherDestinationPoint.x = received.x;
                otherDestinationPoint.z = received.y;
                otherUserModelRef3.current.lookAt(otherDestinationPoint);
                otherMoving = true;
              } else if (received.characterId === 3) {
                otherDestinationPoint.x = received.x;
                otherDestinationPoint.z = received.y;
                otherUserModelRef4.current.lookAt(otherDestinationPoint);
                otherMoving = true;
              } else if (received.characterId === 4) {
                otherDestinationPoint.x = received.x;
                otherDestinationPoint.z = received.y;
                otherUserModelRef5.current.lookAt(otherDestinationPoint);
                otherMoving = true;
              } else if (received.characterId === 5) {
                otherDestinationPoint.x = received.x;
                otherDestinationPoint.z = received.y;
                otherUserModelRef6.current.lookAt(otherDestinationPoint);
                otherMoving = true;
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

  return (
    <>
      <SMain>
        <div className="quiz__wrapper">
          <div className="timer">
            <div ref={barRef} className="progress">
              <FontAwesomeIcon className="timer__icon" icon={faClock} />
            </div>
          </div>

          <p ref={quizContentRef} className="quiz__content"></p>
        </div>
        <Canvas
          style={{ background: "skyblue" }}
          shadows={true}
          gl={{ preserveDrawingBuffer: true }}
        >
          <Scene
            buttonRef={buttonRef}
            send={send}
            userModelRef={userModelRef}
            otherUserModelRef1={otherUserModelRef1}
            otherUserModelRef2={otherUserModelRef2}
            otherUserModelRef3={otherUserModelRef3}
            otherUserModelRef4={otherUserModelRef4}
            otherUserModelRef5={otherUserModelRef5}
            otherUserModelRef6={otherUserModelRef6}
          />
        </Canvas>
      </SMain>
    </>
  );
};

export default Main;
