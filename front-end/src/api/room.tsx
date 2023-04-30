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

// 아이템 위치 수정, 삭제 / 삭제 시 x,y,z에 null 넣어서 보내기
export const apiUpdateMyRoom = async (data: any) => {
  // formData 형식
  const dataForm = [
    {
      id: 1,
      roomId: 1,
      itemId: 1,
      x: "10",
      y: "10",
      z: "10",
    },
    {
      id: 2,
      roomId: 1,
      itemId: 2,
      x: "20",
      y: "20",
      z: "20",
    },
  ];
  try {
    const response = await api.put(`/room`, data);
    return response;
  } catch (e) {
    console.log(e);
  }
};

// 방에 위치 되어있지 않은 보유 아이템 리스트 조회
export const apiGetMyItemList = async (roomId: number) => {
  try {
    const response = await api.get(`/room/items/${roomId}`);
    return response;
  } catch (e) {
    console.log(e);
  }
};
