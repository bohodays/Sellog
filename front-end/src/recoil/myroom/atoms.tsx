import { userInfo } from "os";
import { atom, useRecoilState } from "recoil";

type userInfo = {
  userId: number | null;
  nickname: string;
  img: string;
  email: string;
  bojTarget: string;
  blogTarget: string;
  feedTarget: string;
  csTarget: string;
  velog: string;
  tistory: string;
  github: string;
  motto: string;
  characterId: number | null;
  tel: string;
  contact: string;
};

export const userInfoState = atom<userInfo>({
  key: "UserInfo",
  default: {
    userId: null,
    nickname: "",
    img: "",
    email: "",
    bojTarget: "",
    blogTarget: "",
    feedTarget: "",
    csTarget: "",
    velog: "",
    tistory: "",
    github: "",
    motto: "",
    characterId: null,
    tel: "",
    contact: "",
  },
});
