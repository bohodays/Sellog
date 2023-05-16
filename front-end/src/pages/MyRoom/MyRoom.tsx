import MyProfile from "@/components/MyRoom/MyProfile/MyProfile";
import { SMain } from "./styles";
// import MyRoomContainer from "@/components/MyRoom/MyRoomContainer/MyRoomContainer";
import {
  itemsHeightState,
  myItemsState,
  userInfoState as userAtom,
  userInfoState,
} from "@/recoil/myroom/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
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
  const setItemsHeight = useSetRecoilState(itemsHeightState);

  const itemsArray = [];
  useEffect(() => {
    apiGetTotalMyItems().then((res) => {
      setMyItems(res?.data.response);
      setItemsHeight(res?.data.response);
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
        <EditProfile setIsEdit={setIsEdit} isEdit={isEdit}></EditProfile>
      )}

      {/* 우측 마이룸 */}
      <MyRoomContainer
        activePage={activePage}
        setActivePage={setActivePage}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
      ></MyRoomContainer>
    </SMain>
  );
};

export default MyRoom;
