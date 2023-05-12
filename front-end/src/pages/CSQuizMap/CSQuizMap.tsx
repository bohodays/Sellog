// import React from 'react'
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { localData } from "@/utils/token";

import {
  useGLTF,
  useAnimations,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState, useCallback } from "react";
import { SButtonWrapper, SMain } from "./styles";
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

const Scene = ({ buttonRef, send, other }: any) => {
  const group = useRef<THREE.Group | any>();
  const { nodes, materials, animations } = useGLTF(
    "/models/characters/f1.glb"
  ) as GLTFResult;
  const { actions } = useAnimations<GLTFActions | any>(animations, group);

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  
  const userModelRef = useRef<any>();
  const pointerRef = useRef<any>();

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
  const cameraPosition = new Vector3(-3.5, 10, 10);
  camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
  camera.updateProjectionMatrix();

  function draw() {
    const delta = clock.getDelta();

    if (userModelRef.current?.mixer) {
      userModelRef.current?.mixer.update(delta);
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

  useEffect(() => {
    {other && other.map((ch:any) => (
      ch.draw()
    ))}
    console.log("다른 사용자");
  }, [other]);

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
        item.object.name === "spot" ||
        item.object.name === "stone"
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
    send(mouse.x, mouse.y);
    console.log(mouse.x + " : "+ mouse.y);
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
      <PerspectiveCamera makeDefault={true} far={1000} zoom={1} />

      {/* 맵 바닥 */}
      {/* <Ground name="floor" position={[0, 0, 0]} receiveShadow={true} /> */}
      <mesh name="floor" rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true}>
        <planeGeometry args={[35, 20]} />
        <meshStandardMaterial color={"#5A9720"} />
      </mesh>
      {/* <Floor scale={7} castShadow={true} /> */}
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

      {other && other.map((other:any) => (
        other.character
      ))}

    </Suspense>

    
  );
};

const Main = () => {
  const navigate = useNavigate();
  const buttonRef = useRef<any>();

  const [client, setClient] = useState<Stomp.Client | null>(null);
  const [other, setOther] = useState<any>([]);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const accessToken = localData.getAccessToken();
  const userModelRef = useRef<any>();
  const animations = useGLTF("/models/characters/f1.glb") as GLTFResult;

  const draw = useCallback(({  message, userModelRef, animations }:any) => {
    const { actions } = useAnimations<GLTFActions | any>(animations);
    console.log("hi111");
    //raycaster
    let destinationPoint = new Vector3();
    let angle = 0;
    let isPressed = false; // 마우스를 누르고 있는 상태
    let moving = false;

    if (userModelRef.current) {
      if (isPressed) {
        destinationPoint.x = message.x;
        destinationPoint.y = 0.3;
        destinationPoint.z = message.y;
        userModelRef.current.lookAt(destinationPoint);

        moving = true;
      }

      if (moving) {
        // 걸어가는 상태
        angle = Math.atan2(
          destinationPoint.z - userModelRef.current.position.z,
          destinationPoint.x - userModelRef.current.position.x
        );

        userModelRef.current.position.x += Math.cos(angle) * 0.08;
        userModelRef.current.position.z += Math.sin(angle) * 0.08;

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
  }, []);

  // 소켓 연결
  useEffect(() => {
    const socket = new SockJS("http://localhost:8083/real-time");
    const ws = Stomp.over(socket);

    ws.connect({ Authorization: `Bearer ${accessToken}` }, () => {
      setClient(ws);

      ws.subscribe('/sub/1', (message) => {
        const received = JSON.parse(message.body);
        let data = {};
        if (received.sender != userInfo.userId) {
          let CharacterComponent;
          let characterId = received.characterId;

          switch(characterId) {
            case 0:
              CharacterComponent = <F1_Main />;
              break;
            case 1:
              CharacterComponent = <F2_Main />;
              break;
            case 2:
              CharacterComponent = <F3_Main />;
              break;
            case 3:
              CharacterComponent = <M1_Main />;
              break;
            case 4:
              CharacterComponent = <M2_Main />;
              break;
            default:
              CharacterComponent = <M3_Main />;
          }
          data = {
            message: received,
            draw: () => {
              // draw 함수 내에서 useRef와 useGLTF를 호출하고, other 객체에 저장합니다.
              const userModelRef = useRef<any>();
              const animations = useGLTF("/models/characters/f1.glb") as GLTFResult;
              draw({ message: received, userModelRef, animations });
            },
            character: CharacterComponent,
          }
          console.log(data);

          setOther((other:any) => {
            const index = other.findIndex((item:any) => item.message.sender === received.sender);
            if (index === -1) {
              return [...other, data];
            } else {
              return [
                ...other.slice(0, index),
                data,
                ...other.slice(index + 1)
              ];
            }
          });
        }
      },{ Authorization: `Bearer ${accessToken}` });
    });

    return () => {
      if (ws !== null) {
        ws.disconnect(() => {});
      }
    };
  }, []);

  function send(mouseX:number, mouseY:number) {
    const message = {
        roomId: "1",
        sender: userInfo.userId,
        x: mouseX,
        y: mouseY,
        characterId: userInfo.characterId, 
        nickname: userInfo.nickname
    };
    client?.send("/pub/1", {}, JSON.stringify(message));
  }

  return (
    <SMain>
      <Canvas
        style={{ background: "skyblue" }}
        shadows={true}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Scene
          buttonRef={buttonRef}
          send={send}
          other = {other}
        />
      </Canvas>
    </SMain>
  );
};

export default Main;
