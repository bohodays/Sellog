import getApiInstance from "./http";

const api = getApiInstance();

// 상점 카테고리 별 아이템 목록 가져오기
export const apiGetCategorizedItemList = async (
  category: string,
  curPage: number
) => {
  try {
    const response = await api.get(`/store/${category}?page=${curPage}`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// 아이템 구입
export const apiBuyItem = async (data: any) => {
  // 요청 data 형식
  let dataForm = {
    itemId: 1,
  };

  try {
    const response = await api.post(`/store`, data);
    return response;
  } catch (e) {
    console.log(e);
  }
};
