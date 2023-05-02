import { userInfo } from "os";
import { atom, useRecoilState } from "recoil";

type userInfo = {
  userId: number;
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
  characterId: number;
  tel: string;
  contact: string;
};

export const user = atom<userInfo>({
  key: "myNewAtom",
  default: {
    userId: 0,
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
    characterId: 0,
    tel: "",
    contact: "",
  },
});
