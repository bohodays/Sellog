import MyProfile from "@/components/MyRoom/MyProfile/MyProfile";
import { SMain } from "./styles";
// import MyRoomContainer from "@/components/MyRoom/MyRoomContainer/MyRoomContainer";
import {
  myItemsState,
  userInfoState as userAtom,
  userInfoState,
} from "@/recoil/myroom/atoms";
import { useRecoilState } from "recoil";
import React, { useEffect, useState } from "react";
import MyItems from "@/pages/MyRoom/MyItems/MyItems";
import EditProfile from "@/components/MyRoom/EditProfile/EditProfile";
import { apiGetMyItemList, apiGetTotalMyItems } from "@/api/room";

const MyRoomContainer = React.lazy(
  () => import("@/components/MyRoom/MyRoomContainer/MyRoomContainer")
);

const MyRoom = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [activePage, setActivePage] = useState<string>("myprofile");

  const [isEdit, setIsEdit] = useState<boolean>(false);
  // mount될 때 회원정보 넣어주기.

  const [myItems, setMyItems] = useRecoilState(myItemsState);

  // 여기서 유저가 가지고 있는 아이템 API 호출해서 가지고 있는 아이템들 myItemsState atom에 넣기
  useEffect(() => {
    apiGetTotalMyItems().then((res) => {
      console.log("현재 보유중인 아이템", res?.data.response.content);

      setMyItems(res?.data.response);
    });
  }, []);

  return (
    <SMain>
      {/* 좌측 내 프로필 */}

      {!isEdit && activePage === "myprofile" ? (
        <MyProfile
          userData={user}
          setUserData={setUser}
          setIsEdit={setIsEdit}
          isEdit={isEdit}
        ></MyProfile>
      ) : !isEdit && activePage == "myitems" ? (
        <MyItems></MyItems>
      ) : (
        <EditProfile
          userData={user}
          setUserData={setUser}
          setIsEdit={setIsEdit}
          isEdit={isEdit}
        ></EditProfile>
      )}
      {/* <MyProfile userData={user} setActivePage={setActivePage}></MyProfile> */}

      {/* 우측 마이룸 */}
      <MyRoomContainer
        activePage={activePage}
        setActivePage={setActivePage}
      ></MyRoomContainer>
    </SMain>
  );
};

export default React.memo(MyRoom);
