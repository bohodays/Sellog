import styled from "styled-components";

export const SMain = styled.main`
  height: 100%;
  background-color: #fdeccf;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Chicle", cursive;

  .title {
    font-size: 8vw;
    color: #cb4f4f;
    margin-bottom: 3rem;
  }

  .result {
    font-size: 5vw;
    margin-bottom: 3rem;
  }

  .restart {
    background-color: var(--color-yellow);
    color: var(--color-blue);
    width: 10vw;
    height: 5rem;
    border-radius: 50%;
    border: 3px solid var(--color-blue);
    padding: 0.5rem 0.8rem;
    font-size: 2vw;
    font-family: "Chicle", cursive;
    user-select: none;
  }

  .go-to-home {
    background-color: var(--color-green);
    color: var(--color-white);
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 8vw;
    height: 3rem;
    border-radius: 50%;
    border: 3px solid black;
    padding: 0.5rem 0.8rem;
    font-size: 1.6rem;
    font-family: "Chicle", cursive;
  }

  .title__wrapper {
    position: relative;
  }

  .img__star {
    position: absolute;
    width: 10vw;
    left: -10rem;
    top: -8rem;
    transform: rotate(-12deg);
  }

  .img__smileLarge {
    width: 12vw;
    position: absolute;
    left: 18vw;
    bottom: 10vw;
    transform: rotate(-10deg);
  }

  .img__smile {
    position: absolute;
    right: 8vw;
    top: 20vw;
    transform: rotate(30deg);
  }
`;
