import { atom, useRecoilState } from "recoil";

export const loginState = atom<boolean>({
  key: "Login",
  default: false,
});
