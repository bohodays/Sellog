import { localData } from "@/utils/token";
import axios from "axios";

const getApiInstance = () => {
  const accessToken = localData.getAccessToken();
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNiIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2ODMxNjU1MDh9.9p3D2HpbvxETJmbq5sZIZBzFy39aboEDDIuY9sKpj42GwAjFaps2ZrDKQV2VI25e8v31CniWa1PcpHfyaVoKsg`,
    },
  });
  return instance;
};

export default getApiInstance;
