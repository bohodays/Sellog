import { localData } from "@/utils/token";
import axios from "axios";

const getApiInstance = () => {
  const accessToken = localData.getAccessToken();

  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY4MzUyNDkwNn0.fZciRS0dPdcIaP_pajO3m99tuDGyt_NktrKpEkOpjMzQKEBunFxTFN2fER4UKG6RszCIS0WcplMqVPHqlzwEaQ`,
    },
  });
  return instance;
};

export default getApiInstance;
