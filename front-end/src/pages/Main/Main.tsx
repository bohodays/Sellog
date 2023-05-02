// import React from 'react'

import {
  OrbitControls,
  useGLTF,
  useTexture,
  useAnimations,
  OrthographicCamera,
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

const Scene = ({ setIsVisible }: any) => {
  const group = useRef<THREE.Group | any>();
  const { nodes, materials, animations } = useGLTF(
    "/models/characters/f1.glb"
  ) as GLTFResult;
  const { actions } = useAnimations<GLTFActions | any>(animations, group);

  const userModelRef = useRef<any>();
  const pointerRef = useRef<any>();
  const spotRef = useRef<any>();
  const spotRef2 = useRef<any>();
  const spotRef3 = useRef<any>();
  const houseRef = useRef<any>();
  const itemshopRef = useRef<any>();
  const csquizRef = useRef<any>();
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
  const cameraPosition = new Vector3(-2, 4, 5);
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

        userModelRef.current.position.x += Math.cos(angle) * 0.06;
        userModelRef.current.position.z += Math.sin(angle) * 0.06;

        camera.position.x = cameraPosition.x + userModelRef.current.position.x;
        camera.position.z = cameraPosition.z + userModelRef.current.position.z;

        actions["Idle"]?.stop();
        actions["Run"]?.play();

        if (
          Math.abs(destinationPoint.x - userModelRef.current.position.x) <
            0.03 &&
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
            houseRef.current.visible = true;
            spotRef.current.material.color.set("seagreen");
            gsap.to(houseRef.current.position, {
              duration: 1,
              y: 0,
              ease: "Bounce.easeOut",
            });
            gsap.to(camera.position, {
              duration: 1,
              y: 2.5,
            });
          }
        } else if (houseRef.current?.visible) {
          console.log("집 들어가");
          spotRef.current.material.color.set("yellow");
          gsap.to(houseRef.current.position, {
            duration: 0.5,
            y: -5,
          });
          gsap.to(camera.position, {
            duration: 1,
            y: 4,
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
            itemshopRef.current.visible = true;
            spotRef2.current.material.color.set("seagreen");
            gsap.to(itemshopRef.current.position, {
              duration: 1,
              y: 0,
              ease: "Bounce.easeOut",
            });
            gsap.to(camera.position, {
              duration: 1,
              y: 2.5,
            });
          }
        } else if (itemshopRef.current?.visible) {
          console.log("상점 들어가");
          spotRef2.current.material.color.set("yellow");
          gsap.to(itemshopRef.current.position, {
            duration: 0.5,
            y: -2,
          });
          gsap.to(camera.position, {
            duration: 1,
            y: 4,
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
            csquizRef.current.visible = true;
            spotRef3.current.material.color.set("seagreen");
            gsap.to(csquizRef.current.position, {
              duration: 1,
              y: 0.5,
              ease: "Bounce.easeOut",
            });
            gsap.to(camera.position, {
              duration: 1,
              y: 2.5,
            });
          }
        } else if (csquizRef.current?.visible) {
          console.log("cs퀴즈 들어가");
          spotRef3.current.material.color.set("yellow");
          gsap.to(csquizRef.current.position, {
            duration: 0.5,
            y: -1,
          });
          gsap.to(camera.position, {
            duration: 1,
            y: 4,
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
    camera.left = -(window.innerWidth / window.innerHeight);
    camera.right = window.innerWidth / window.innerHeight;
    camera.top = 1;
    camera.bottom = -1;

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
        item.object.name === "spot3"
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
      <OrthographicCamera
        makeDefault={true}
        left={-(window.innerWidth / window.innerHeight)}
        right={window.innerWidth / window.innerHeight}
        top={1}
        bottom={-1}
        near={-1000}
        far={1000}
        zoom={80}
      />

      {/* 맵 바닥 */}
      <mesh name="floor" rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>

      {/* 유저 캐릭터 */}
      <group ref={group} dispose={null} position={[0, 0.3, 0]}>
        <group name="Scene">
          <group
            name="rig"
            position={[0, -0.17, 0]}
            castShadow={true}
            receiveShadow={true}
            ref={userModelRef}
          >
            <primitive object={nodes.root} />
            <primitive object={nodes["MCH-torsoparent"]} />
            <skinnedMesh
              name="f_1"
              geometry={nodes.f_1.geometry}
              material={materials.characters}
              skeleton={nodes.f_1.skeleton}
              castShadow={true}
              receiveShadow={true}
            />
          </group>
        </group>
      </group>

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
  const [isVisible, setIsVisible] = useState(false);

  return (
    <SMain>
      <Canvas shadows={true} gl={{ preserveDrawingBuffer: true }}>
        <Scene setIsVisible={setIsVisible} />
      </Canvas>
      <SButtonWrapper isVisible={isVisible}>
        <div className="btn-info">
          😘 습관을 통해 포인트를 얻어 마이룸을 꾸며보세요 ! 😘
        </div>
        <button className="btn">이동</button>
      </SButtonWrapper>
    </SMain>
  );
};

export default Main;
