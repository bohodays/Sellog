import { IUserSignup } from "@/typeModels/user/userSignup";
import { IUserGoalSetting } from "@/typeModels/mygoals/myGoalInterfaces";
import { IMyProfileUpdate } from "@/typeModels/user/userEditInfo";
import getApiInstance from "./http";
import { localData } from "@/utils/token";

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

export const apiRefreshToken = async () => {
  const accessToken = localData.getAccessToken();
  // console.log("a", accessToken);
  const refreshToken = localData.getRefreshToken();
  // console.log("r", refreshToken);
  const data = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
  try {
    const refreshTokenResponse = await api.post(`/user/access`, data);
    const newAccessToken = refreshTokenResponse.data.response.accessToken;
    const newResponse = await api.get(`/user`, {
      headers: {
        Authorization: `Bearer ${newAccessToken}`,
      },
    });

    localData.setAccessToken(refreshTokenResponse.data.response.accessToken);

    localData.setRefreshToken(refreshTokenResponse.data.response.refreshToken);
    return newResponse;
  } catch (refreshError) {
    console.log("토큰 갱신 실패:", refreshError);
  }
};

// 유저 정보 조회
export const apiGetUserInfo = async () => {
  try {
    const response = await api.get(`/user`);
    return response;
  } catch (e: any) {
    console.log(e);
    if (e.response && e.response.status === 401) {
      const accessToken = localData.getAccessToken();
      const refreshToken = localData.getRefreshToken();
      const data = {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      // 토큰 만료 에러 처리

      try {
        // 토큰 갱신 API 호출
        const refreshTokenResponse = await api.post(`/user/access`, data);
        // 새로운 accessToken으로 유저 정보 조회
        const newAccessToken = refreshTokenResponse.data.response.accessToken;
        const newResponse = await api.get(`/user`, {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        });

        localData.setAccessToken(
          refreshTokenResponse.data.response.accessToken
        );

        localData.setRefreshToken(
          refreshTokenResponse.data.response.refreshToken
        );
        return newResponse;
      } catch (refreshError) {
        // console.log("토큰 갱신 실패:", refreshError);
        console.log(e);
      }
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
  // console.log(data, "회원정보 수정 api 보내기 전 데이터");

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
  // console.log(typeof pic);

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

// 회원탈퇴
export const apiDelUserInfo = async () => {
  try {
    const response = await api.delete(`/user`);
    return response;
  } catch (e) {
    console.log(e);
  }
};
