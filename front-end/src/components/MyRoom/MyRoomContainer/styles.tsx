import styled from "styled-components";
// import { IMyRoomProps } from "@/typeModels/MyRoom/myroomInterfaces";

export const SMyRoom = styled.section<any>`
  position: relative;
  height: 100%;
  width: ${(props) => (props.activePage === "myprofile" ? "70%" : "60%")};
  background-color: #3d636b;

  .myitems__btn {
    padding: 8px;
    font-family: "Chicle";
    background-color: #ffcc00;
    border-radius: 30px;
    font-size: 1.5vw;
    border: 3px solid black;
    box-shadow: 1px 1px 3px black;
    position: absolute;
    bottom: 3.5vh;
    right: 2.5vw;
    display: ${(props) => (props.activePage === "myprofile" ? "" : "none")};
  }

  .myitem__edit {
    padding: 8px;
    font-family: "Chicle";
    background-color: #ffcc00;
    border-radius: 30px;
    font-size: 1.5vw;
    border: 3px solid black;
    box-shadow: 1px 1px 3px black;
    position: absolute;
    bottom: 3.5vh;
    left: 2.5vw;
    display: ${(props) => (props.activePage === "myitems" ? "" : "none")};
  }

  .myitem__rotation {
    padding: 8px;
    font-family: "Chicle";
    background-color: #ffcc00;
    border-radius: 30px;
    font-size: 1.5vw;
    border: 3px solid black;
    box-shadow: 1px 1px 3px black;
    position: absolute;
    bottom: 3.5vh;
    left: 2.5vw;
    display: ${(props) => (props.activePage === "myitems" ? "" : "none")};
  }

  .myitem__delete {
    padding: 8px;
    font-family: "Chicle";
    background-color: #ffcc00;
    border-radius: 30px;
    font-size: 1.5vw;
    border: 3px solid black;
    box-shadow: 1px 1px 3px black;
    position: absolute;
    bottom: 3.5vh;
    left: 9vw;
    display: ${(props) => (props.activePage === "myitems" ? "" : "none")};
  }

  .myitem__complete {
    padding: 8px;
    font-family: "Chicle";
    background-color: #ffcc00;
    border-radius: 30px;
    font-size: 1.5vw;
    border: 3px solid black;
    box-shadow: 1px 1px 3px black;
    position: absolute;
    bottom: 3.5vh;
    left: 14.5vw;
    display: ${(props) => (props.activePage === "myitems" ? "" : "none")};
  }

  .myitemsGoback__btn {
    padding: 8px;
    font-family: "Chicle";
    background-color: #ffcc00;
    border-radius: 30px;
    font-size: 1.5vw;
    border: 3px solid black;
    box-shadow: 1px 1px 3px black;
    position: absolute;
    bottom: 3.5vh;
    right: 2.5vw;
    display: ${(props) => (props.activePage === "myitems" ? "" : "none")};
  }
`;
