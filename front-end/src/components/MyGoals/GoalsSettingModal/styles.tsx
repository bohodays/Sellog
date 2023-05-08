import styled from "styled-components";

export const SDiv = styled.div`
  position: fixed;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 40%;
  border: 2px solid #083d4f;
  padding: 0.5vw;
  background-color: #e8dda1;
  border-radius: 20px;

  .modal {
    border: 2px solid #083d4f;
    border-radius: 3px;
    background-color: #81a9a8;
    height: 100%;
    width: 100%;
    padding: 5vw;
  }
`;

export const SSection = styled.section<any>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  z-index: 4;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
