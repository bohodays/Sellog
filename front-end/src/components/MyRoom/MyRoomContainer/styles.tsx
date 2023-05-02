import styled from "styled-components";
import { MyRoomProps } from "@/typeModels/MyRoom/myroomInterfaces";

export const SMyRoom = styled.section<MyRoomProps>`
  height: 100%;
  width: ${(props) => (props.activePage === "myprofile" ? "70%" : "60%")};
  background-color: #3d636b;
`;
