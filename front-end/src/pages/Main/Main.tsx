// import React from 'react'

import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { SMain } from "./styles";
import { PCFSoftShadowMap, RepeatWrapping, Vector2, Vector3 } from "three";
import { Ilbuni } from "@/components/Main/Models/Ilbuni";
import GridImg from "../../assets/imgs/main/grid.png";
import { House } from "@/components/Main/Models/House";
import { gsap } from "gsap";

const Scene = () => {
  const userModelRef = useRef<any>();
  const pointerRef = useRef<any>();
  const spotRef = useRef<any>();
  const houseRef = useRef<any>();

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

    // console.log(userModelRef.current, "확인");

    if (userModelRef.current) {
      camera.lookAt(userModelRef.current.position);
      // console.log(userModelRef.current.position);
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
        userModelRef.current.position.x += Math.cos(angle) * 0.05;
        userModelRef.current.position.z += Math.sin(angle) * 0.05;
        // console.log(
        //   userModelRef.current.position.x,
        //   userModelRef.current.position.z,
        //   gl.domElement.clientHeight,
        //   "좌표"
        // );

        // camera.position.x = cameraPosition.x + userModelRef.current.position.x;
        // camera.position.z = cameraPosition.z + userModelRef.current.position.z;
        camera.position.x = cameraPosition.x;
        camera.position.z = cameraPosition.z;
        // console.log(camera.position, "카메라 포지션");

        // 애니메이션 변환 추가해야 됨

        if (
          Math.abs(destinationPoint.x - userModelRef.current.position.x) <
            0.03 &&
          Math.abs(destinationPoint.z - userModelRef.current.position.z) < 0.03
        ) {
          moving = false;
          console.log("멈춤");
        }

        if (
          Math.abs(
            spotRef.current.position.x - userModelRef.current.position.x
          ) < 1.5 &&
          Math.abs(
            spotRef.current.position.z - userModelRef.current.position.z
          ) < 1.5
        ) {
          if (!houseRef.current.visible) {
            console.log("나와!");
            houseRef.current.visible = true;
            spotRef.current.material.color.set("seagreen");
            gsap.to(houseRef.current.position, {
              duration: 1,
              y: 1,
              ease: "Bounce.easeOut",
            });
            gsap.to(camera.position, {
              duration: 1,
              y: 3,
            });
          }
        } else if (houseRef.current?.visible) {
          console.log("들어가");
          houseRef.current.visible = false;
          spotRef.current.material.color.set("yellow");
          gsap.to(houseRef.current.position, {
            duration: 5,
            y: -1.3,
          });
          gsap.to(camera.position, {
            duration: 1,
            y: 4,
          });
        }
      } else {
        // 서 있는 상태
        // 애니메이션 추가해야 됨
      }
    }

    gl.setAnimationLoop(draw);
  }

  draw();

  // console.log(camera);

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
      if (item.object.name === "floor") {
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
    // console.log(e.clientX, e.clientY, mouse, gl.domElement);
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
    console.log(mouse, "왜?");
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

  // useFrame(() => {
  //   draw();
  //   if (houseRef.current) {
  //     console.log("visible", houseRef.current.visible);
  //   }
  // });

  return (
    <Suspense>
      {/* 빛 */}
      <ambientLight color={"white"} intensity={0.5} />
      <directionalLight
        color={"white"}
        intensity={0.5}
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

      {/* 맵 바닥 */}
      <mesh name="floor" rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>

      {/* 일분이 모델 */}
      <Ilbuni
        userModelRef={userModelRef}
        position={[0, 0.3, 0]}
        name="ilbuni"
      />

      {/* 일분이를 따라다니는 pointMesh */}
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
      <House ref={houseRef} position={[5, -1.3, 2]} castShadow={true} />
    </Suspense>
  );
};

const Main = () => {
  return (
    <SMain>
      <Canvas shadows={true} gl={{ preserveDrawingBuffer: true }}>
        <OrbitControls
          enableRotate={false}
          enableZoom={false}
          // 쉬프트 마우스 왼쪽 이동 막는 기능
          enablePan={false}
        />
        <Scene />
      </Canvas>
    </SMain>
  );
};

export default Main;
