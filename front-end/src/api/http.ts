import { localData } from "@/utils/token";
import axios from "axios";

const getApiInstance = () => {
  const accessToken = localData.getAccessToken();

  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return instance;
};

export default getApiInstance;
