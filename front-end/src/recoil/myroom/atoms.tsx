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
    userId: 1,
    nickname: "Mojung",
    img: "/src/assets/imgs/retro/profilePic.jpeg",
    email: "hohohojung@gmail.com",
    bojTarget: "1 commit per day",
    blogTarget: "1 post per week",
    feedTarget: "1 issue per day",
    csTarget: "5 quiz per day",
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
