import styled from "styled-components";

export const SSection = styled.section`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0%;
  left: 0%;
  /* background-color: rgba(0, 0, 0, 0); */
  z-index: 1;
`;

export const SDiv = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 12vh;
  right: 6vw;
  width: 25vw;
  height: 35vh;
  /* box-shadow: 2px 2px 2px gray; */
  overflow: scroll;
  background-color: rgb(255, 255, 255);
  z-index: 5;
  border-radius: 10px;
  cursor: default;

  ::-webkit-scrollbar {
    display: none;
  }

  .doneItem__column__wrapper {
    display: flex;
    width: 100%;
    text-align: center;
    padding: 0.5vh 0vw;
    border-bottom: 1px solid lightgrey;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .doneItem__left__column {
    width: 30%;
    border-right: 1px solid lightgrey;
    padding: 0.6vh 0vw;
  }

  .doneItem__right__column {
    width: 70%;
    padding: 0.6vh 0vw;
  }
`;
