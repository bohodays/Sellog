import { userInfoState } from "@/recoil/myroom/atoms";
import React, { Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { SSection } from "./styles";
import { Canvas } from "@react-three/fiber";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
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

const SceneMyCharacter = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const myCharacterId = userInfo.characterId;

  const location = useLocation();

  const myCorrect = location.state.myCorrect;
  const otherCorrect = location.state.otherCorrect;
  const result = myCorrect - otherCorrect;

  return (
    <Suspense>
      <ambientLight intensity={0.7} />
      {myCharacterId === 0 ? (
        <F1 result={result} />
      ) : myCharacterId === 1 ? (
        <F2 result={result} />
      ) : myCharacterId === 2 ? (
        <F3 result={result} />
      ) : myCharacterId === 3 ? (
        <M1 result={result} />
      ) : myCharacterId === 4 ? (
        <M2 result={result} />
      ) : (
        <M3 result={result} />
      )}
    </Suspense>
  );
};

const SceneOtherCharacter = () => {
  const location = useLocation();

  const otherUserCharacterId = location.state.otherUserCharacterId;
  const myCorrect = location.state.myCorrect;
  const otherCorrect = location.state.otherCorrect;
  const result = otherCorrect - myCorrect;

  return (
    <Suspense>
      <ambientLight intensity={0.7} />
      {otherUserCharacterId === 0 ? (
        <F1_Other result={result} />
      ) : otherUserCharacterId === 1 ? (
        <F2_Other result={result} />
      ) : otherUserCharacterId === 2 ? (
        <F3_Other result={result} />
      ) : otherUserCharacterId === 3 ? (
        <M1_Other result={result} />
      ) : otherUserCharacterId === 4 ? (
        <M2_Other result={result} />
      ) : otherUserCharacterId === 5 ? (
        <M3_Other result={result} />
      ) : (
        ""
      )}
    </Suspense>
  );
};

const CSQuizBattleResult = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const navigate = useNavigate();

  const location = useLocation();

  const myCorrect = location.state.myCorrect;
  const otherCorrect = location.state.otherCorrect;
  const otherNickname = location.state.otherNickname;
  const otherUserCharacterId = location.state.otherUserCharacterId;
  const quizList = location.state.quizList;

  return (
    <SSection>
      <button
        className="go-to-home"
        onClick={() => {
          navigate("/main");
          window.location.reload();
        }}
      >
        HOME
      </button>
      <div
        className="page-state__wrapper"
        onClick={() => {
          navigate("/csquiz-matching");
          window.location.reload();
        }}
      >
        <div className="page-state">RESTART</div>
      </div>

      <div className="character__wrapper my-character">
        <p className="result">
          {myCorrect > otherCorrect
            ? "WIN"
            : myCorrect === otherCorrect
            ? "DRAW"
            : "LOSE"}
        </p>
        <Canvas>
          <SceneMyCharacter />
        </Canvas>
        <p className="my-character-name">{userInfo.nickname}</p>
        <p className="correct-count">{`${myCorrect} CORRECT`}</p>
      </div>
      <div className="character__wrapper other-character">
        <p className="result">
          {" "}
          {otherCorrect > myCorrect
            ? "WIN"
            : otherCorrect === myCorrect
            ? "DRAW"
            : "LOSE"}
        </p>
        <Canvas>
          <SceneOtherCharacter />
        </Canvas>
        <p className="other-character-name">{otherNickname}</p>
        <p className="correct-count">{`${otherCorrect} CORRECT`}</p>
      </div>
      <div className="answer">explanation</div>
      <div className="explanation__wrapper">
        <p className="explanation">{`1. ${quizList[0].answer}`}</p>
        <p className="explanation">{`2. ${quizList[1].answer}`}</p>
        <p className="explanation">{`3. ${quizList[2].answer}`}</p>
      </div>
    </SSection>
  );
};

export default CSQuizBattleResult;
