import styled from "styled-components";

export const SMain = styled.main`
  font-family: "Special Elite", cursive;

  .top {
    position: absolute;
    left: 50%;
    top: 4rem;
    transform: translateX(-50%);
    color: #cb4f4f;
    font-size: 3.5vw;
  }

  .error__wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    background-color: var(--color-yellow);
    width: 37vw;
    height: 17vw;
    border-radius: 50%;
  }

  .error {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--color-yellow);
    color: var(--color-blue);
    width: 35vw;
    height: 15vw;
    border: 8px solid var(--color-blue);
    border-radius: 50%;

    font-size: 10vw;
    span {
      margin: 0;
      line-height: 100%;
      font-size: 10vw;
      transform: translate(-0.2vw, 1vw);
    }
  }

  .bottom {
    position: absolute;
    left: 50%;
    bottom: 4rem;
    transform: translateX(-50%);
    color: #cb4f4f;
    font-size: 3vw;
  }
`;
