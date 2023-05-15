import React, { Suspense, useEffect, useRef } from "react";
import { SMain } from "./styles";
import { Canvas, useThree } from "@react-three/fiber";
import { PerspectiveCamera, useTexture } from "@react-three/drei";
import { House } from "@/components/Main/Models/House";
import { MyRoomFont } from "@/components/Main/Models/Myroom_font";
import { ItemShopMap } from "@/components/Main/Models/ItemShopMap";
import { NewCsQuiz } from "@/components/Main/Models/NewCsQuiz";
import { PCFSoftShadowMap, RepeatWrapping } from "three";
import { gsap } from "gsap";
import { ItemShopFont } from "@/components/Main/Models/ItemShop_font";
import { CSQuizFont } from "@/components/Main/Models/Csquiz_font";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Feed } from "@/components/Main/Models/Feed";
import { FeedFont } from "@/components/Main/Models/Feed_font";
import ChromeImg from "@/assets/imgs/retro/chrome_logo.png";

const Scene = () => {
  const houseRef = useRef<any>();
  const itemshopRef = useRef<any>();
  const csquizRef = useRef<any>();
  const feedRef = useRef<any>();

  const itemshopFontRef = useRef<any>();

  const { gl, camera, scene } = useThree<any>();
  gl.setSize(window.innerWidth, window.innerHeight);
  gl.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  gl.shadowMap.enabled = true;
  gl.shadowMap.type = PCFSoftShadowMap;

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    gl.setSize(window.innerWidth, window.innerHeight);
    gl.render(scene, camera);
  }

  const positionArray = [
    {
      x: -5,
      z: 20,
    },
    {
      x: 7,
      z: 10,
    },
    {
      x: -10,
      z: 0,
    },
    {
      x: 10,
      z: -10,
    },
    {
      x: -5,
      z: -20,
    },
  ];

  let currentSection = 0;

  function setSection() {
    const newSection = Math.round(window.scrollY / window.innerHeight);

    if (currentSection !== newSection) {
      gsap.to(camera.position, {
        duration: 1.5,
        x: positionArray[newSection].x,
        z: positionArray[newSection].z + 5,
      });
      currentSection = newSection;
    }
  }

  window.addEventListener("resize", setSize);
  window.addEventListener("scroll", setSection);

  // Texture
  const floorTexture = useTexture(ChromeImg);
  floorTexture.wrapS = RepeatWrapping;
  floorTexture.wrapT = RepeatWrapping;

  return (
    <Suspense>
      <ambientLight color={"white"} intensity={0.5} />
      <spotLight
        color={"white"}
        intensity={0.7}
        position={[0, 150, 100]}
        castShadow={true}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={200}
      />
      <PerspectiveCamera
        position={[-5, 2, 25]}
        makeDefault={true}
        fov={75}
        aspect={window.innerWidth / window.innerHeight}
        near={0.1}
        far={1000}
      />

      {/* 맵 바닥 */}
      <mesh name="floor" rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={"#5A9720"} />
      </mesh>

      {/* 마이룸 */}
      <House houseRef={houseRef} position={[-5, 0, 20]} castShadow={true} />
      {/* 마이룸 폰트 */}
      <MyRoomFont position={[-9.8, 0, 20]} />

      {/* 상점 */}
      <ItemShopMap
        itemshopRef={itemshopRef}
        position={[7, 0, 10]}
        castShadow={true}
      />
      <ItemShopFont
        itemshopFontRef={itemshopFontRef}
        position={[7, 0, 10]}
        castShadow={true}
      />

      {/* CS 퀴즈 */}
      <NewCsQuiz csquizRef={csquizRef} position={[-10, 0.1, 0]} />
      <CSQuizFont position={[-13, 0.5, 0]} />

      {/* Feed */}
      <Feed position={[10, 0, -10]} castShadow={true} />
      <FeedFont position={[14, 0, -10]} />

      <mesh name="chrome" position={[-7, 2.5, -20]}>
        <planeGeometry args={[3, 5]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>
    </Suspense>
  );
};

const Info = () => {
  const navigate = useNavigate();

  const handleMoveHome = () => {
    navigate("/main");
    window.location.reload();
  };

  return (
    <SMain>
      <Canvas
        className="three-canvas"
        style={{ background: "skyblue" }}
        shadows={true}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Scene />
      </Canvas>
      <div className="sections">
        <section className="section">
          <h2>01</h2>
          <p>My Room에서는 습관 설정 및 방 꾸미기가 가능합니다.</p>
          <p>
            습관 설정은 5가지의 카테고리(github commit, blog posting, algorithm,
            feed, cs quiz)로 구성되어 있으며,
          </p>
          <p>
            습관 달성으로 얻는 포인트를 통해 상점에서 아이템을 구매하여 방을
            꾸밀 수 있습니다.
          </p>
        </section>
        <section className="section">
          <h2>02</h2>
          <p>
            Item Shop에서는 습관 달성으로 얻은 포인트를 통해 여러가지 아이템을
            구매할 수 있습니다.
          </p>
          <p>구매한 아이템은 My Room에서 방을 꾸미는데 사용됩니다.</p>
        </section>
        <section className="section">
          <h2>03</h2>
          <p>CS Quiz는 Solo Play 모드와 1vs1 Battle 모드가 있습니다.</p>
          <p>
            Solo Play에서는 5가지의 영역 중 한 가지를 선택하면 5문제가
            출제됩니다.
          </p>
          <p>각 문제는 4지선다로 이루어져 있으며, 2분의 제한시간이 있습니다.</p>
          <p>
            1vs1 Battle에서는 다른 유저와 실시간 CS Quiz 대결을 할 수 있습니다.
          </p>
          <p>
            매칭이 이루어지면 3개의 OX 퀴즈가 출제되며, 각 문제당 20초의
            제한시간이 있습니다.
          </p>
        </section>
        <section className="section">
          <h2>04</h2>
          <p>Feed에서는 여러 IT 기술 블로그 포스트를 모아 볼 수 있습니다.</p>
          <button className="go-to-home" onClick={handleMoveHome}>
            HOME
          </button>
        </section>
        <section className="section">
          <h2>05</h2>
          <p>아래의 링크를 통해 Chrome 웹 스토어에서 Sellog를 설치해주세요. </p>
          <p>설치 후 확장 프로그램의 Github나 Tistory 버튼을 클릭하여</p>
          <p>
            로그인을 진행하면 목표 달성 여부를 자동으로 체크하는 기능을 이용하실
            수 있습니다.{" "}
          </p>
          <button className="go-to-home">
            <Link
              to={
                "https://chrome.google.com/webstore/detail/sellog/baafapflapkopdlopohcmebnadhkambm?hl=ko"
              }
              target="_blank"
            >
              INSTALL
            </Link>
          </button>
        </section>
      </div>
    </SMain>
  );
};

export default Info;
