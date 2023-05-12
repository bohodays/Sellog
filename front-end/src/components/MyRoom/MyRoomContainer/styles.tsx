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
    right: 6vw;
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
    display: ${(props) => (props.activePage === "myitems" ? "flex" : "none")};
    justify-content: center;
    align-items: center;

    p {
      margin: 0 1rem;
      user-select: none;
    }
  }

  .rotation__button-icon {
    font-size: 1.5vw;
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
    left: 12vw;
    display: ${(props) => (props.activePage === "myitems" ? "" : "none")};
    user-select: none;
  }

  .myitem__up {
    padding: 8px;
    font-family: "Chicle";
    background-color: #ffcc00;
    border-radius: 30px;
    font-size: 1.5vw;
    border: 3px solid black;
    box-shadow: 1px 1px 3px black;
    position: absolute;
    bottom: 11vh;
    left: 2.5vw;
    width: 4vw;
    display: ${(props) => (props.activePage === "myitems" ? "" : "none")};
    user-select: none;
  }

  .myitem__down {
    padding: 8px;
    font-family: "Chicle";
    background-color: #ffcc00;
    border-radius: 30px;
    font-size: 1.5vw;
    border: 3px solid black;
    box-shadow: 1px 1px 3px black;
    position: absolute;
    bottom: 11vh;
    left: 7vw;
    width: 4vw;
    display: ${(props) => (props.activePage === "myitems" ? "" : "none")};
    user-select: none;
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
    right: 6vw;
    display: ${(props) => (props.activePage === "myitems" ? "" : "none")};
  }
  .goHome__button {
    /* display: flex;
    justify-self: end; */
    position: absolute;
    bottom: 4.5vh;
    right: 2.5vw;
    font-size: 1.7rem;
    color: #d8b904;
  }
`;
