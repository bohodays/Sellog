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

  h4 {
    font-family: "Quantico";
    color: rgba(0, 0, 0, 0.5);
    margin-top: 18vh;
  }

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

  .doneCount__wrapper {
    width: 30vw;
    height: 5vh;
    padding: 3vh 2vw;
    font-family: "Quantico";
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid rgba(229, 229, 229, 0.2);
  }

  .doneCount__wrapper:hover {
    background-color: rgba(229, 229, 229, 0.2);
  }

  .type {
    margin-left: 0.8vw;
    font-size: 1.2vw;
    font-weight: 700;
  }

  .count {
    padding: 0.2vh 0.8vw;
    background-color: #ff9d9d;
    border-radius: 20px;
    color: white;
    width: 10vw;
    text-align: center;
  }
`;

export const SDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  padding: 8% 0%;
`;
