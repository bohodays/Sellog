// 아이템별 처음 높이(y)를 반환해주는 함수
export const itemDefaultInfo = (itemId: number | undefined | null) => {
  if (!itemId) return null;

  if (itemId === 21) {
    return -1.5;
  } else if (itemId === 25) {
    return -4.2;
  } else if (itemId === 32) {
    return -3.8;
  } else if (itemId === 35) {
    return -1.5;
  } else if (itemId === 36) {
    return -1.5;
  } else if (itemId === 37) {
    return -1.5;
  } else if (itemId === 38) {
    return -2.2;
  } else {
    return -2.5;
  }
};
