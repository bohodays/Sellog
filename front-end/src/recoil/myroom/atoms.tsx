import { atom, useRecoilState } from "recoil";

export interface IUserInfo {
  userId: number | null;
  nickname: string;
  img: string;
  email: string;
  githubTarget: string;
  bojTarget: string;
  blogTarget: string;
  feedTarget: boolean;
  csTarget: boolean;
  velog: string;
  tistory: string;
  github: string;
  motto: string;
  characterId: number | null;
  tel: string;
  contact: string;
  [key: string]: string | number | boolean | null;
}

export const userInfoState = atom<IUserInfo>({
  key: "UserInfo",
  default: {
    userId: 1,
    nickname: "Mojung",
    img: "/src/assets/imgs/retro/profilePic.jpeg",
    email: "hohohojung@gmail.com",
    githubTarget: "",
    bojTarget: "",
    blogTarget: "",
    feedTarget: false,
    csTarget: false,
    velog: "hojung@velog.io",
    tistory: "https://hojung@tistory.com",
    github: "https://github.com/Dohyun-Kimm",
    motto: "You are made of your past",
    characterId: 2,
    tel: "010-1234-5678",
    contact: "hojung@gmail.com",
  },
});

export const itemTargetState = atom<null | string>({
  key: "ItemTarget",
  default: null,
});
