import React from "react";
import { SProfile } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import profilePic from "@/assets/imgs/retro/profilePic.jpeg";
import github from "@/assets/imgs/retro/github.png";
import tistory from "@/assets/imgs/retro/tistoryIcon.png";
import smileBottom from "@/assets/imgs/retro/smile_bottom.png";
import coin from "@/assets/imgs/retro/coin.png";
import { useRef, useState } from "react";
import { apiUpdateUserInfo } from "@/api/user";
interface MyProfileProps {
  userData: any;
  setUserData: any;
  setIsEdit: any;
  isEdit: boolean;
}

function EditProfile(props: MyProfileProps) {
  const nicknameRef: any = useRef("");
  const mottoRef: any = useRef("");
  const emailRef: any = useRef("");
  const tistoryRef: any = useRef("");
  const githubRef: any = useRef("");

  const editHandler = () => {
    // api put 함수 넣기
    props.setUserData({
      ...props.userData,
      nickname: nicknameRef.current.value,
      email: emailRef.current.value,
      motto: mottoRef.current.value,
      tistory: tistoryRef.current.value,
      github: githubRef.current.value,
    });
    console.log(props.setUserData);
    // console.log(props.isEdit);
    // api userinfo put request 인자 포함한 함수.
    // apiUpdateUserInfo(nicknameRef.current.value,emailRef.current.value,mottoRef.current.value,tistoryRef.current.value,githubRef.current.value);
    props.setIsEdit(!props.isEdit);
  };
  return (
    <SProfile>
      <div className="head"> EDIT ME</div>
      <img className="sticker__smilebottom" src={smileBottom} alt="" />
      <div className="body__profile">
        <div className="container__baseinfo">
          <label htmlFor="file-input">
            <img
              className="img__profile"
              src={props.userData.img}
              alt="profile pic"
            />
          </label>

          <div className="container__userinfo">
            <p className="username">{props.userData.nickname}</p>
            <div className="point__container">
              <img className="sticker__coin" src={coin} alt="coin" />
              <p>1000</p>
            </div>
          </div>
        </div>
        <div className="container__edit">
          <div className="box__edit box__name">
            <p>NICK NAME</p>
            <input
              type="text"
              placeholder={props.userData.nickname}
              ref={nicknameRef}
            />
          </div>
          <div className="box__edit box__motto">
            <p>MOTTO</p>
            <input
              type="text"
              placeholder={props.userData.motto}
              ref={mottoRef}
            />
          </div>
          <div className="box__edit box__email">
            <p>E-MAIL</p>
            <input
              type="text"
              placeholder={props.userData.email}
              ref={emailRef}
            />
          </div>
          <div className="box__edit box__tistory">
            <p>TISTORY</p>
            <input
              type="text"
              placeholder={props.userData.tistory}
              ref={tistoryRef}
            />
          </div>
          <div className="box__edit box__github">
            <p>GITHUB</p>
            <input
              type="text"
              placeholder={props.userData.github}
              ref={githubRef}
            />
          </div>
        </div>
        <button className="button__goal" onClick={editHandler}>
          <p>수정하기</p>
        </button>
        <hr />
        <div className="platform-address">
          <div>
            <a href={`${props.userData.github}`}>
              <img src={github} className="sticker__github" alt="github Icon" />
            </a>
            <a href={`${props.userData.tistory}`}>
              <img src={tistory} className="sticker__tistory" alt="" />
            </a>
          </div>
        </div>
      </div>
    </SProfile>
  );
}

export default EditProfile;
