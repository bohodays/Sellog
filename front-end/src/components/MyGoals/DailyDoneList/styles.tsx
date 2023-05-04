import styled from "styled-components";

export const SSection = styled.section`
  position: relative;
  background-color: #585f6f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40vh;
  width: calc(30vw);
  border-radius: 20px;
  margin-top: 3vh;

  .selected__date {
    padding: 1vh 2vw;
    background-color: rgb(221, 221, 221, 0.7);
    font-family: "Bangers";
    font-size: 1.5vw;
    border-radius: 20px;
    position: absolute;
    top: -2vh;
  }

  .cool__img {
    position: absolute;
    top: -2vw;
    left: -2vw;
  }

  .rainbow__img {
    position: absolute;
    bottom: -3.5vw;
    right: 26vw;
    height: 40px;
  }
`;
