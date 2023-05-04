import styled from "styled-components";

export const SDiv = styled.div`
  width: 40%;

  .item__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(193, 176, 146, 0.7);
    margin: 0.5vw 0.3vw;
    padding: 0.5vw;
    border-radius: 10px;
    height: 25vh;
  }

  .item__name {
    font-family: "Bangers";
    font-size: 1.1vw;
    margin-top: 1vh;
  }
`;
