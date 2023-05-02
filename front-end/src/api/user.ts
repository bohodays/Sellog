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
export const apiUpdateUserInfo = async () => {
  try {
    const response = await api.put(`/user`);
    return response;
  } catch (e) {
    console.log(e);
  }
};
