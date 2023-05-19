import { IFeed, IFeedProps } from "@/typeModels/Feed/feedinterfaces";
import getApiInstance from "./http";

const api = getApiInstance();
// 피드 페이지 단위로 읽기
export const getFeedApi = async (page: number) => {
  try {
    const response = await api.get(`/feeds?size=8&&page=${page}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 조회수 증가 api
export const addVisitApi = async (feedId: Number) => {
  try {
    const response = await api.put(`/feeds/${feedId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 조회순으로 높은 피드 가져오기
export const getMostView = async () => {
  try {
    const response = await api.get(`/feeds/views`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
