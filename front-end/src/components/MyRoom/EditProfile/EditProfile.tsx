import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SProfile } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faEnvelope,
  faLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import profilePic from "@/assets/imgs/retro/profilePic.jpeg";
import github from "@/assets/imgs/retro/github.png";
import tistory from "@/assets/imgs/retro/tistoryIcon.png";
import smileBottom from "@/assets/imgs/retro/smile_bottom.png";
import coin from "@/assets/imgs/retro/coin.png";
import { useRef, useState } from "react";
import { apiUpdateUserInfo } from "@/api/user";
import { IMyProfileUpdate } from "@/typeModels/user/userEditInfo";
import { localData } from "@/utils/token";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

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
  const blogRef: any = useRef("");
  const githubRef: any = useRef("");

  const [isModal, setIsModal] = useState<boolean>(false);

  const profileImg: any = useRef(props.userData.img);
  const [newProfileImg, setNewProfileImg] = useState(profileImg.current);
  const [imgFile, setImgFile] = useState(""); // 미리보기 실제 파일(저장을 위한)

  // 프로필 사진 바꾸는 로직
  function profileHandler() {
    profileImg.current.click();
  }

  // 이미지변화 생겼을때
  const onChange: any = (e: any) => {
    const currentImg = e.target.files[0];
    console.log("currentImg", currentImg); // 바뀐 파일 불러와짐
    if (currentImg) {
      const newImgReader = new FileReader();
      // 인스턴스 생성 되었을때
      newImgReader.readAsDataURL(currentImg);
      newImgReader.onload = () => {
        // 미리보기 만들어주는 코드
        const imageDataURL = newImgReader.result;

        const base64 = imageDataURL?.toString();
        setNewProfileImg(imageDataURL);
        setImgFile(currentImg);
      };
    } else {
      console.log("change error", profilePic);
    }
  };

  // 개인정보 유효성 검사.

  // 닉네임 유효성
  function isValidNickName(nick: string) {
    const nicknameRegex = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9_-]{2,16}$/;
    return nicknameRegex.test(nick);
  }
  // 좌우명 유효성
  function isValidMotto(mo: string) {
    const mottoRegex = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9_-]{2,16}$/;
    return mottoRegex.test(mo);
  }
  // 이메일 유효성
  function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  // 깃허브 유효성
  // function isValidGithub(git: string) {
  //   const githubRegex = /^[^\s@]+github[^\s@]+\.[^\s@]+$/;
  // }
  // 블로그 유효성
  function isValidBlog(blog: string) {
    const blogRegex =
      /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+)\.([a-zA-Z0-9-.]+)(?:\/[^\s]*)?$/;
    console.log(blog);

    const matches = blog.match(blogRegex);
    console.log(matches);

    if (matches && matches.length >= 3) {
      const subdomain = matches[1];
      const topLevelDomain = matches[2];
      return topLevelDomain === "tistory.com";
    }
    return false;
  }

  // 입력된 값 테스트
  function isValid() {
    let validNum = 0;
    if (!isValidNickName(nicknameRef.current.value)) {
      console.log("Nick Name", isValidNickName(nicknameRef.current.value));
    } else {
      // valid nickname
      validNum++;
    }
    if (!isValidMotto(mottoRef.current.value)) {
      console.log("Motto", isValidMotto(mottoRef.current.value));
    } else {
      // valid motto
      validNum++;
    }
    if (!isValidEmail(emailRef.current.value)) {
      console.log("Email");
    } else {
      // valid email
      validNum++;
    }
    if (!isValidBlog(blogRef.current.value)) {
      console.log("blog");
    } else {
      //valid blog
      validNum++;
    }
    // 모두 만족하면 true 리턴
    if (validNum === 4) {
      return true;
    } else {
      return false;
    }

    // isValidGithub(githubRef.current.value);
    // validNum ++
  }
  // 프로필 수정하는 함수
  const editHandler = () => {
    // api put 함수 넣기
    console.log({ newProfileImg });
    props.setUserData({
      ...props.userData,
      img: newProfileImg,
      nickname: nicknameRef.current.value,
      email: emailRef.current.value,
      motto: mottoRef.current.value,
      blog: blogRef.current.value,
      github: githubRef.current.value,
    });

    // console.log("after", props.userData); IMyProfileUpdate
    const editUserData: any = {
      nickname: nicknameRef.current.value,
      motto: mottoRef.current.value,
      contact: emailRef.current.value,
      blog: blogRef.current.value,
      github: githubRef.current.value,
    };

    const accessToken = localData.getAccessToken();

    if (accessToken) {
      apiUpdateUserInfo(editUserData, imgFile).then((res) => {
        console.log("returned response", res?.data.response);
      });
    }
  };

  const gobackHandler = () => {
    props.setIsEdit(!props.isEdit);
  };
  const confirmModalHandler = () => {
    if (isValid()) {
      setIsModal(!isModal);
    } else {
      return;
      // 유효성 검사 실패한 부분 알려주기
    }
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
              src={newProfileImg}
              alt="profile pic"
              onClick={profileHandler}
            />
          </label>
          <input
            type="file"
            style={{ display: "none" }}
            accept="image/jpg,impge/png,image/jpeg"
            name="profile_img"
            onChange={onChange}
            ref={profileImg}
          />

          <div className="container__userinfo">
            <p className="username">{props.userData.nickname}</p>
            <div className="point__container">
              <img className="sticker__coin" src={coin} alt="coin" />
              <p>{props.userData.points}</p>
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
            <p>BLOG</p>
            <input
              type="text"
              placeholder="ex) https://example.tistory.com"
              ref={blogRef}
            />
          </div>
        </div>
        <div className="button__edit">
          {/* <FontAwesomeIcon icon={faLeftLong} onClick={gobackHandler} /> */}
          <button className="button__goal" onClick={gobackHandler}>
            <p>Go Back</p>
          </button>
          <button className="button__goal" onClick={confirmModalHandler}>
            <p>Confirm</p>
          </button>
        </div>
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
      {isModal && (
        <EditProfileModal
          isModal={isModal}
          setIsModal={setIsModal}
          isEdit={props.isEdit}
          setIsEdit={props.setIsEdit}
          editHandler={editHandler}
        ></EditProfileModal>
      )}
    </SProfile>
  );
}

export default EditProfile;
