// import React from 'react'

import {
  useGLTF,
  useTexture,
  useAnimations,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { SButtonWrapper, SMain } from "./styles";
import { PCFSoftShadowMap, RepeatWrapping, Vector2, Vector3 } from "three";
import GridImg from "../../assets/imgs/main/grid_test.png";
import { House } from "@/components/Main/Models/House";
import { gsap } from "gsap";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { AirBalloon } from "@/components/Main/Models/AirBalloon";
import { ItemShopMap } from "@/components/Main/Models/ItemShopMap";
import { Flower } from "@/components/Main/Models/Flower";
import { Weather } from "@/components/Main/Models/Weather";
import { NewCsQuiz } from "@/components/Main/Models/NewCsQuiz";
import { F1_Main } from "@/components/Main/Models/F1_Main";
import { useNavigate } from "react-router-dom";
import { apiGetUserInfo } from "@/api/user";
import { F2_Main } from "@/components/Main/Models/F2_Main";
import { F3_Main } from "@/components/Main/Models/F3_Main";
import { M2_Main } from "@/components/Main/Models/M2_Main";
import { M1_Main } from "@/components/Main/Models/M1_Main";
import { M3_Main } from "@/components/Main/Models/M3_Main";
import ToggleButton from "@/components/Main/ToggleButton/ToggleButton";
import { useRecoilState } from "recoil";
import { userInfoState } from "@/recoil/myroom/atoms";
import { MyRoomFont } from "@/components/Main/Models/Myroom_font";
import { ItemShopFont } from "@/components/Main/Models/ItemShop_font";
import { CSQuizFont } from "@/components/Main/Models/Csquiz_font";
import { FeedFont } from "@/components/Main/Models/Feed_font";

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

const Scene = ({ buttonRef }: any) => {
  const group = useRef<THREE.Group | any>();
  const { nodes, materials, animations } = useGLTF(
    "/models/characters/f1.glb"
  ) as GLTFResult;
  const { actions } = useAnimations<GLTFActions | any>(animations, group);

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useFrame(() => {
    console.log(1);

    // console.log(userModelRef.current.position);
  });

  const userModelRef = useRef<any>();
  const pointerRef = useRef<any>();
  const spotRef = useRef<any>();
  const spotRef2 = useRef<any>();
  const spotRef3 = useRef<any>();
  const spotRef4 = useRef<any>();
  const houseRef = useRef<any>();
  const houseFontRef = useRef<any>();
  const itemshopRef = useRef<any>();
  const itemshopFontRef = useRef<any>();
  const csquizRef = useRef<any>();
  const csquizFontRef = useRef<any>();
  const feedRef = useRef<any>();
  const feedFontRef = useRef<any>();
  const airBalloonRef = useRef<any>();

  // Texture
  const floorTexture = useTexture(GridImg);
  floorTexture.wrapS = RepeatWrapping;
  floorTexture.wrapT = RepeatWrapping;
  floorTexture.repeat.x = 10;
  floorTexture.repeat.y = 10;

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

        // 마이룸
        if (
          Math.abs(
            spotRef.current.position.x - userModelRef.current.position.x
          ) < 1.5 &&
          Math.abs(
            spotRef.current.position.z - userModelRef.current.position.z
          ) < 1.5
        ) {
          if (!houseRef.current.visible) {
            console.log("집 나와!");
            buttonRef.current.style.zIndex = 100;
            buttonRef.current.style.opacity = 1;
            // console.log(buttonRef.current.children[0].innerText);

            houseRef.current.visible = true;
            spotRef.current.material.color.set("seagreen");
            gsap.to(houseRef.current.position, {
              duration: 1,
              y: 0,
              ease: "Bounce.easeOut",
            });
            gsap.to(houseFontRef.current.position, {
              duration: 1,
              y: 0,
              ease: "Bounce.easeOut",
            });
            gsap.to(camera.position, {
              duration: 1,
              y: 4.5,
            });
          }
        } else if (houseRef.current?.visible) {
          console.log("집 들어가");
          buttonRef.current.style.zIndex = -1;
          buttonRef.current.style.opacity = 0;
          spotRef.current.material.color.set("yellow");
          gsap.to(houseRef.current.position, {
            duration: 0.5,
            y: -5,
          });
          gsap.to(houseFontRef.current.position, {
            duration: 0.5,
            y: -1,
            ease: "Bounce.easeOut",
          });
          gsap.to(camera.position, {
            duration: 1,
            y: 8,
          });
          setTimeout(() => {
            houseRef.current.visible = false;
          }, 400);
          //  상점
        } else if (
          Math.abs(
            spotRef2.current.position.x - userModelRef.current.position.x
          ) < 1.5 &&
          Math.abs(
            spotRef2.current.position.z - userModelRef.current.position.z
          ) < 1.5
        ) {
          if (!itemshopRef.current.visible) {
            console.log("상점 나와!");
            buttonRef.current.style.zIndex = 100;
            buttonRef.current.style.opacity = 1;
            buttonRef.current.children[0].innerText =
              "😘 포인트로 원하는 아이템을 구매해보세요 ! 😘";
            // console.log(buttonRef.current.children[0].innerText);

            itemshopRef.current.visible = true;
            spotRef2.current.material.color.set("seagreen");
            gsap.to(itemshopRef.current.position, {
              duration: 1,
              y: 0,
              ease: "Bounce.easeOut",
            });
            gsap.to(itemshopFontRef.current.position, {
              duration: 1,
              y: 0,
              ease: "Bounce.easeOut",
            });
            gsap.to(camera.position, {
              duration: 1,
              y: 4.5,
            });
          }
        } else if (itemshopRef.current?.visible) {
          console.log("상점 들어가");
          buttonRef.current.style.zIndex = -1;
          buttonRef.current.style.opacity = 0;
          spotRef2.current.material.color.set("yellow");
          gsap.to(itemshopRef.current.position, {
            duration: 0.5,
            y: -2,
          });
          gsap.to(itemshopFontRef.current.position, {
            duration: 0.5,
            y: -1,
          });
          gsap.to(camera.position, {
            duration: 1,
            y: 8,
          });
          setTimeout(() => {
            itemshopRef.current.visible = false;
          }, 400);
        } else if (
          Math.abs(
            spotRef3.current.position.x - userModelRef.current.position.x
          ) < 1.5 &&
          Math.abs(
            spotRef3.current.position.z - userModelRef.current.position.z
          ) < 1.5
        ) {
          if (!csquizRef.current.visible) {
            console.log("cs퀴즈 나와!");
            buttonRef.current.style.zIndex = 100;
            buttonRef.current.style.opacity = 1;
            buttonRef.current.children[0].innerText =
              "😘 cs 퀴즈를 풀어보세요 ! 😘";
            csquizRef.current.visible = true;
            spotRef3.current.material.color.set("seagreen");
            gsap.to(csquizRef.current.position, {
              duration: 1,
              y: 0.5,
              ease: "Bounce.easeOut",
            });
            gsap.to(csquizFontRef.current.position, {
              duration: 1,
              y: 0.5,
              ease: "Bounce.easeOut",
            });
            gsap.to(camera.position, {
              duration: 1,
              y: 4.5,
            });
          }
        } else if (csquizRef.current?.visible) {
          console.log("cs퀴즈 들어가");
          buttonRef.current.style.zIndex = -1;
          buttonRef.current.style.opacity = 0;
          spotRef3.current.material.color.set("yellow");
          gsap.to(csquizRef.current.position, {
            duration: 0.5,
            y: -1,
          });
          gsap.to(csquizFontRef.current.position, {
            duration: 0.5,
            y: -0.5,
          });
          gsap.to(camera.position, {
            duration: 1,
            y: 8,
          });
          setTimeout(() => {
            csquizRef.current.visible = false;
          }, 400);
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
        item.object.name === "spot" ||
        item.object.name === "spot2" ||
        item.object.name === "spot3" ||
        item.object.name === "spot4"
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
  gl.domElement.addEventListener("mousemove", (e: MouseEvent) => {
    if (isPressed) {
      calculateMousePosition(e);
    }
  });

  // 터치 이벤트
  gl.domElement.addEventListener("touchstart", (e: TouchEvent) => {
    isPressed = true;
    calculateMousePosition(e.touches[0]);
  });
  gl.domElement.addEventListener("touchend", (e: TouchEvent) => {
    isPressed = false;
  });
  gl.domElement.addEventListener("touchmove", (e: TouchEvent) => {
    if (isPressed) {
      calculateMousePosition(e.touches[0]);
    }
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
      <PerspectiveCamera makeDefault={true} far={1000} zoom={1.2} />

      {/* 맵 바닥 */}
      <mesh name="floor" rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true}>
        <planeGeometry args={[100, 100]} />
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

      {/* 유저 캐릭터를 따라다니는 pointMesh */}
      <mesh
        ref={pointerRef}
        name="point"
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 0]}
        receiveShadow={true}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color={"crimson"} transparent={true} opacity={0.5} />
      </mesh>

      {/* 집을 보이게 하는 spotMesh */}
      <mesh
        ref={spotRef}
        name="spot"
        rotation={[-Math.PI / 2, 0, 0]}
        position={[5, 0.005, 5]}
        receiveShadow={true}
      >
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial
          color={"yellow"}
          transparent={true}
          opacity={0.5}
        />
      </mesh>

      {/* 집 */}
      <House
        houseRef={houseRef}
        visible={false}
        position={[5, -5, 3]}
        castShadow={true}
      />
      {/* 집 font */}
      <MyRoomFont
        houseFontRef={houseFontRef}
        position={[1, -1, 5]}
        castShadow={true}
      />

      {/* 상점을 보이게 하는 spotMesh */}
      <mesh
        ref={spotRef2}
        name="spot2"
        rotation={[-Math.PI / 2, 0, 0]}
        position={[5, 0.005, -10]}
        receiveShadow={true}
      >
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial
          color={"yellow"}
          transparent={true}
          opacity={0.5}
        />
      </mesh>

      <ItemShopMap
        itemshopRef={itemshopRef}
        visible={false}
        position={[5.5, -2, -12]}
        castShadow={true}
      />
      {/* 아이템샵 폰트 */}
      {/* <ItemShopFont position={[1, 0, -10]} /> */}
      <ItemShopFont itemshopFontRef={itemshopFontRef} castShadow={true} />

      {/* cs quiz를 보이게 하는 spotMesh */}
      <mesh
        ref={spotRef3}
        name="spot3"
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-14, 0.005, -14]}
        receiveShadow={true}
      >
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial
          color={"yellow"}
          transparent={true}
          opacity={0.5}
        />
      </mesh>

      <NewCsQuiz
        csquizRef={csquizRef}
        visible={false}
        position={[-15, -1, -16]}
        castShadow={true}
      />
      <CSQuizFont
        csquizFontRef={csquizFontRef}
        castShadow={true}
        position={[-18, -0.5, -13.5]}
      />

      {/* Feed를 보이게 하는 spotMesh */}
      <mesh
        ref={spotRef4}
        name="spot4"
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-14, 0.005, 5]}
        receiveShadow={true}
      >
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial
          color={"yellow"}
          transparent={true}
          opacity={0.5}
        />
      </mesh>

      {/* Feed 모델 들어가야함 */}
      {/* <ItemShopMap
        itemshopRef={itemshopRef}
        visible={false}
        position={[5.5, -2, -12]}
        castShadow={true}
      /> */}
      <FeedFont position={[-17.5, 0, 5]} />

      {/* 장식들 */}
      {/* 열기구 */}
      <AirBalloon ref={airBalloonRef} position={[-5, 3, 0]} castShadow={true} />
      {/* 꽃 */}
      <Flower position={[-2, 0, -22]} castShadow={true} />
      {/* 해와 구름비 */}
      <Weather position={[24, 5, -5]} castShadow={true} />
    </Suspense>
  );
};

const Main = () => {
  const navigate = useNavigate();
  const buttonRef = useRef<any>();
  console.log(buttonRef.current);

  const handleRouterMove = () => {
    if (buttonRef.current.children[0].innerText.includes("cs")) {
      navigate("/csquiz");
    } else if (buttonRef.current.children[0].innerText.includes("구매")) {
      navigate("/item-shop");
    } else if (buttonRef.current.children[0].innerText.includes("꾸며")) {
      navigate("/myroom");
    }
  };

  return (
    <SMain>
      <ToggleButton />
      <Canvas shadows={true} gl={{ preserveDrawingBuffer: true }}>
        <Scene buttonRef={buttonRef} />
      </Canvas>
      <SButtonWrapper ref={buttonRef}>
        <div className="btn-info">
          😘 습관을 통해 포인트를 얻어 마이룸을 꾸며보세요 ! 😘
        </div>
        <button className="btn" onClick={handleRouterMove}>
          이동
        </button>
      </SButtonWrapper>
    </SMain>
  );
};

export default Main;
