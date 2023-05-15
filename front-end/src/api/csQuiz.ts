import getApiInstance from "./http";

const api = getApiInstance();

// 선택한 카테고리에 맞게 문제 목록 받아오기
export const apiGetQuizList = async (category: string) => {
  console.log(category);

  try {
    const response = await api.get(
      `/exam/${encodeURIComponent(category.trim())}`
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

// 매칭서버로부터 roomId 받기
export const apiGetRoomId = async () => {
  try {
    const response = await api.get(`https://k8a404.p.ssafy.io/matching`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// 실시간 문제에서 사용할 OX 문제 3개 가져오기
export const apiGetOXQuiz = async () => {
  try {
    const response = await api.get(`/exam/real-time`);
    return response;
  } catch (e) {
    console.log(e);
  }
};
