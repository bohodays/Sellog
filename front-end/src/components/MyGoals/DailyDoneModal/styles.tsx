import styled from "styled-components";

export const SDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  border: 2px solid #000;
  box-shadow: 1px 1px 3px black;
  padding: 4;
  overflow: scroll;
  background-color: white;

  ::-webkit-scrollbar {
    display: none;
  }
`;
