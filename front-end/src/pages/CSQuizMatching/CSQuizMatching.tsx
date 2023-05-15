import React, { Suspense, useState, useEffect, useRef } from "react";
import { SSection } from "./styles";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { useRecoilState } from "recoil";
import { userInfoState } from "@/recoil/myroom/atoms";
import { F1 } from "@/components/Login/Models/F1";
import { F2 } from "@/components/Login/Models/F2";
import { F3 } from "@/components/Login/Models/F3";
import { M1 } from "@/components/Login/Models/M1";
import { M2 } from "@/components/Login/Models/M2";
import { M3 } from "@/components/Login/Models/M3";
import { Canvas } from "@react-three/fiber";
import { F1_Other } from "@/components/Login/Models/OtherModles/F1_Other";
import { F2_Other } from "@/components/Login/Models/OtherModles/F2_Other";
import { F3_Other } from "@/components/Login/Models/OtherModles/F3_Other";
import { M1_Other } from "@/components/Login/Models/OtherModles/M1_Other";
import { M2_Other } from "@/components/Login/Models/OtherModles/M2_Other";
import { M3_Other } from "@/components/Login/Models/OtherModles/M3_Other";
import { apiGetOXQuiz, apiGetRoomId } from "@/api/csQuiz";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { localData } from "@/utils/token";
import { useNavigate } from "react-router-dom";

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
        <F1 />
      ) : myCharacterId === 1 ? (
        <F2 />
      ) : myCharacterId === 2 ? (
        <F3 />
      ) : myCharacterId === 3 ? (
        <M1 />
      ) : myCharacterId === 4 ? (
        <M2 />
      ) : (
        <M3 />
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
        <F1_Other />
      ) : otherUser === 1 ? (
        <F2_Other />
      ) : otherUser === 2 ? (
        <F3_Other />
      ) : otherUser === 3 ? (
        <M1_Other />
      ) : otherUser === 4 ? (
        <M2_Other />
      ) : otherUser === 5 ? (
        <M3_Other />
      ) : (
        ""
      )}
    </Suspense>
  );
};

let navigateRoomId: string;

const CSQuizMatching = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [client, setClient] = useState<Stomp.Client | null>(null);

  // matching : 유저와 매칭을 기다리는 중
  // landing : 5초 후 퀴즈 풀이 페이지로 이동하는 상태
  const [currentState, setCurrentState] = useState("matching");

  // 상대 유저 모델
  const [otherUser, setOtherUser] = useState<any>(null);
  // 상대 유저 닉네임
  const otherNickname = useRef<any>();
  // 상대 유저 id
  const [otherUserId, setOtherUserId] = useState<any>(null);

  // 매칭 후 5초 타이머
  // 5초가 지나면 csQuizMap으로 라우터 이동
  const landingTimerRef = useRef<HTMLSpanElement | any>(null);

  const accessToken = localData.getAccessToken();

  const navigate = useNavigate();

  const [quizList, setQuizList] = useState<any>([]);

  useEffect(() => {
    apiGetRoomId().then((res) => {
      const roomId = res?.data.response;
      const socket = new SockJS(`https://k8a404.p.ssafy.io/real-time`);
      const ws = Stomp.over(socket);

      ws.connect({ Authorization: `Bearer ${accessToken}` }, () => {
        setClient(ws);

        ws.subscribe(
          `/sub/${roomId}`,
          (message) => {
            const received = JSON.parse(message.body);

            console.log({ received });

            if (received.sender !== userInfo.userId) {
              if (Object.keys(received).length === 3) {
                console.log({ received }, "여기로 안 오나???????????");

                setQuizList(received);
                setCurrentState("landing");
              }
              if (Object.keys(received).length === 6) {
                navigateRoomId = received.roomId;

                // 유저가 매칭되면 매칭된 유저의 캐릭터 모델 렌더링, 이름 변경 및 landing 상태로 변경
                setOtherUser(received.characterId);
                otherNickname.current.innerText = received.nickname;
                setOtherUserId(received.sender);
              }
            }
          },
          { Authorization: `Bearer ${accessToken}` }
        );
      });
    });
  }, []);

  useEffect(() => {
    if (currentState === "landing") {
      const landingTimeInterval = setInterval(() => {
        if (landingTimerRef.current && landingTimerRef.current.innerText > 0) {
          landingTimerRef.current.innerText = (
            parseInt(landingTimerRef.current.innerText) - 1
          ).toString();
        } else if (landingTimerRef.current) {
          clearInterval(landingTimeInterval);
          console.log(quizList, "???????????????????????????");

          navigate(`/csQuizMap/${navigateRoomId}`, {
            state: {
              otherUserChracterId: otherUser,
              otherUserId: otherUserId,
              otherNickname: otherNickname.current.innerText,
              quizList,
            },
          });
        }
      }, 1000);
      return () => clearInterval(landingTimeInterval);
    }
  }, [currentState]);

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
      <div className="page-state__wrapper"></div>
      {currentState === "matching" ? (
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
        <p ref={otherNickname} className="other-character-name"></p>
      </div>
    </SSection>
  );
};

export default CSQuizMatching;
