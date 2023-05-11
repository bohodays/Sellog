import getApiInstance from "./http";

const api = getApiInstance();

// 마이룸 조회
export const apiGetMyRoom = async (roomId: number) => {
  try {
    const response = await api.get(`/room/${roomId}`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export interface IUpdateMyRoom {
  id: number | null;
  roomId: number | null;
  itemId: number | null;
  x: null | number;
  y: null | number;
  z: null | number;
  rotation: null | number;
}

// 아이템 위치 수정, 삭제 / 삭제 시 x,y,z에 null 넣어서 보내기
export const apiUpdateMyRoom = async (data: Array<IUpdateMyRoom>) => {
  try {
    console.log(data);

    const response = await api.put(`/room`, data);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// 카테고리별 보유아이템 전체 가져오기 (페이지네이션)
export const apiGetMyItemList = async (category: string, page: number) => {
  try {
    const response = await api.get(
      `/room/items/${category}/users?size=6&page=${page}`
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

// 유저가 보유한 모든 아이템 가져오기
export const apiGetTotalMyItems = async () => {
  try {
    const response = await api.get(`/room/items/all`);
    return response;
  } catch (e) {
    console.log(e);
  }
};
