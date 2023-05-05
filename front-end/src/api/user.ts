import { IUserSignup } from "@/typeModels/user/userSignup";
import { IMyProfileUpdate } from "@/typeModels/user/userEditInfo";
import getApiInstance from "./http";

const api = getApiInstance();

// 유저 과거 기록 정보 조회
export const apiGetUserRecord = async (userId: number) => {
  try {
    const response = await api.get(`/user/record/${userId}`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// 유저 정보 조회
export const apiGetUserInfo = async () => {
  try {
    const response = await api.get(`/user`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// 유저 목표, 포인트, 정보 수정
export const apiUpdateUsergoal = async () => {
  try {
    const response = await api.put(`/user`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// 유저 회원가입 정보 수정
export const apiUpdateUserSignupInfo = async (data: IUserSignup) => {
  console.log(data, "회원정보 수정 api 보내기 전 데이터");

  try {
    const response = await api.put(`/user/signup`, data);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// 유저 개인 정보 수정
// 수정된 정보만 보내는 함수
export const apiUpdateUserInfo = async (data: IMyProfileUpdate) => {
  console.log(typeof data, "개인정보 수정 api 보내기 전 데이터", data);

  try {
    const response = await api.put(`/user/`, data);
    return response;
  } catch (e) {
    console.log(e);
  }
};
