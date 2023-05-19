import getApiInstance from "./http";
import { IRecordCSFeed } from "@/typeModels/Feed/feedinterfaces";

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

// 유지 일수, 누적 보상 조회
export const apiGetAccumulatedRecordList = async () => {
  try {
    const response = await api.get(`/record/maintain`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// 통계
export const apiGetChartList = async () => {
  try {
    const response = await api.get(`/record/statistics`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// 피드 읽은 기록 남기기
export const addFeedRecordApi = async (data: IRecordCSFeed) => {
  try {
    const response = await api.post(`/record`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
