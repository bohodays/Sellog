import { useEffect } from "react";
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
  const tistoryRef: any = useRef("");
  const githubRef: any = useRef("");

  const [isModal, setIsModal] = useState<boolean>(false);

  const profileImg: any = useRef(props.userData.img);
  const [newProfileImg, setNewProfileImg] = useState(profileImg.current);

  // 프로필 사진 바꾸는 로직
  function profileHandler() {
    // console.log("profileHandler??", typeof profileImg);
    profileImg.current.click();
  }

  // 이미지변화 생겼을때
  const onChange: any = (e: any) => {
    const currentImg = e.target.files[0];
    console.log("currentImg", currentImg); // 바뀐 파일 불러와짐
    if (currentImg) {
      const newImgReader = new FileReader();
      // 인스턴스 생성 되었을때
      newImgReader.onload = () => {
        // 미리보기 만들어주는 코드
        const imageDataURL = newImgReader.result;
        setNewProfileImg(imageDataURL);
      };
      newImgReader.readAsDataURL(currentImg);
    } else {
      console.log("change error", profilePic);
    }
  };

  const editHandler = () => {
    // api put 함수 넣기
    console.log({ newProfileImg });

    props.setUserData({
      ...props.userData,
      img: newProfileImg,
      nickname: nicknameRef.current.value,
      email: emailRef.current.value,
      motto: mottoRef.current.value,
      tistory: tistoryRef.current.value,
      github: githubRef.current.value,
    });

    // console.log("after", props.userData); IMyProfileUpdate
    const editUserData: any = {
      nickname: nicknameRef.current.value,
      motto: mottoRef.current.value,
      contact: emailRef.current.value,
      blog: tistoryRef.current.value,
      github: githubRef.current.value,
    };

    // console.log(JSON.stringify(editUserData));
    // console.log("eidt", editUserData);

    // console.log("blob", blob);

    const accessToken = localData.getAccessToken();

    if (accessToken) {
      apiUpdateUserInfo(editUserData, newProfileImg).then((res) => {
        console.log("returned response", res?.data.response);
      });
    }
    setIsModal(!isModal);
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
          <p>Confirm</p>
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
      {isModal && (
        <EditProfileModal
          isModal={isModal}
          setIsModal={setIsModal}
          isEdit={props.isEdit}
          setIsEdit={props.setIsEdit}
        ></EditProfileModal>
      )}
    </SProfile>
  );
}

export default EditProfile;
