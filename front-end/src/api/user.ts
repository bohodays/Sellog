import { IUserSignup } from "@/typeModels/user/userSignup";
import { IUserGoalSetting } from "@/typeModels/mygoals/myGoalInterfaces";
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
  } catch (e: any) {
    console.log(e.response.status);

    if (e.response.status === 401) {
      return "accessTokenReNew";
    }
  }
};

// 유저 목표 수정
export const apiUpdateUsergoal = async (data: IUserGoalSetting) => {
  try {
    const response = await api.put(`/user/target`, data);
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
export const apiUpdateUserInfo = async (data: any, pic?: any) => {
  // console.log("개인정보 수정 api 보내기 전 데이터", data, pic);
  const formData = new FormData();
  console.log(typeof pic);

  const blob = new Blob([JSON.stringify(data)], {
    type: "application/json",
  });
  if (data != null) {
    formData.append("memberUpdateDto", blob);
    // console.log("???????", [JSON.stringify(data)]);
    // console.log("formData", formData);
  }

  formData.append("img", pic);

  // console.log(formData.get("img"));

  try {
    const response = await api.put(`/user`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};
