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
  bottom: 12vh;
  right: 6vw;
  width: 25vw;
  height: 35vh;
  box-shadow: 2px 2px 2px gray;
  overflow: scroll;
  background-color: rgb(255, 255, 255);
  z-index: 10;
  border-radius: 10px;
  cursor: default;

  ::-webkit-scrollbar {
    display: none;
  }
`;
