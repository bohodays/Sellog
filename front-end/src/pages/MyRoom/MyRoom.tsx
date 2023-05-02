import MyProfile from "@/components/MyRoom/MyProfile/MyProfile";
import { SMain } from "./styles";
import MyRoomContainer from "@/components/MyRoom/MyRoomContainer/MyRoomContainer";
import { userInfoState as userAtom } from "@/recoil/myroom/atoms";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import MyItems from "@/components/MyRoom/MyItems/MyItems";

const MyRoom = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [activePage, setActivePage] = useState<string>("myprofile");

  // mount될 때 회원정보 넣어주기.

  async function getUserInfo() {
    // Api 함수 호출 + 리턴 값 저장
    // const response = await apiGetUserInfo();
    // user 값 변경 (recoil)
    // setUser(response.data);
  }

  useEffect(() => {
    // api/user | API get userInfo 마운트 될 때
    // getUserInfo().then(() => console.log(userAtom));
    // console.log(user);
    console.log("HI");
  }, []);
  return (
    <SMain>
      {/* 좌측 내 프로필 */}
      {activePage === "myprofile" ? (
        <MyProfile userData={user} setActivePage={setActivePage}></MyProfile>
      ) : (
        <MyItems></MyItems>
      )}
      {/* <MyProfile userData={user} setActivePage={setActivePage}></MyProfile> */}

      {/* 우측 마이룸 */}
      <MyRoomContainer activePage={activePage}></MyRoomContainer>
    </SMain>
  );
};

export default MyRoom;
