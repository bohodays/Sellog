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

  // instance.interceptors.request.use(
  //   function (config) {
  //     // 요청 성공 직전 호출됩니다.
  //     // axios 설정값을 넣습니다. (사용자 정의 설정도 추가 가능)
  //     return config;
  //   },
  //   async function (error) {
  //     const originRequest = error.config;
  //     const status = error.response.status;

  //     if (status === 401) {
  //       try {
  //         const response = await axios({
  //           url: `${import.meta.env.VITE_API_BASE_URL}/user/access`,
  //           method: "post",
  //           headers: {
  //             accessToken: localStorage.getItem("accessToken"),
  //             refreshToken: localStorage.getItem("refreshToken"),
  //           },
  //         });
  //         localStorage.setItem(
  //           "accessToken",
  //           response.data.response.accessToken
  //         );
  //         localStorage.setItem(
  //           "refreshToken",
  //           response.data.response.refreshToken
  //         );
  //         axios.defaults.headers.common.Authorization = `Bearer ${response.data.response.accessToken}`;
  //         originRequest.headers.Authorization = `Bearer ${response.data.response.accessToken}`;
  //         return axios(originRequest);
  //       } catch (error) {
  //         // Token renewal request failed, handle error appropriately
  //         return Promise.reject(error);
  //       }
  //     }
  //     // 요청 에러 직전 호출됩니다.
  //     return Promise.reject(error);
  //   }
  // );

  return instance;
};

export default getApiInstance;
