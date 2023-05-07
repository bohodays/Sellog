import { IFeed, IFeedProps } from "@/typeModels/Feed/feedinterfaces";
import getApiInstance from "./http";

const api = getApiInstance();

export const getFeedApi = async () => {
  try {
    const response = await api.get(`/feeds`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
