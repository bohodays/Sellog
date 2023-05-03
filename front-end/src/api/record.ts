import getApiInstance from "./http";

const api = getApiInstance();

// 월별 기록 조회
export const apiGetMonthlyRecordList = async (year: number, month: number) => {
  try {
    const response = await api.get(`/record/month?year=${year}&month=${month}`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// 오늘 날짜 기록 조회
export const apiGetTodayRecord = async () => {
  try {
    const response = await api.get(`/record`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// 목표 시작 날짜 기준으로 오늘까지의 기록 조회
export const apiGetAchievedRecordList = async () => {
  try {
    const response = await api.get(`/record/start`);
    return response;
  } catch (e) {
    console.log(e);
  }
};
