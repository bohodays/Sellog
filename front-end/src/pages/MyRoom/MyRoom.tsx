import MyProfile from "@/components/MyRoom/MyProfile/MyProfile";
import { SMain } from "./styles";
import MyRoomContainer from "@/components/MyRoom/MyRoomContainer/MyRoomContainer";

const MyRoom = () => {
  return (
    <SMain>
      {/* 좌측 내 프로필 */}
      <MyProfile></MyProfile>

      {/* 우측 마이룸 */}
      <MyRoomContainer></MyRoomContainer>
    </SMain>
  );
};

export default MyRoom;
