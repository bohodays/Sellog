import styled from "styled-components";

export const SSection = styled.section`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0%;
  left: 0%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 4;
`;
export const SDiv = styled.div`
  position: fixed;
  width: 30vw;
  height: 60vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  background-color: rgba(56, 54, 54, 1);
  border-radius: 10px;
`;
