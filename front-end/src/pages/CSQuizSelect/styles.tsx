import styled from "styled-components";

export const SMain = styled.main`
  position: relative;
  height: 100%;
  background-color: var(--color-beige);
  background-color: var(--color-beige);

  .check-pattern {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    position: absolute;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translateX(-50%);
    background-color: var(--color-beige);
    border: 1px solid #c4c4c4;
    background-image: linear-gradient(0deg, transparent 28px, #c4c4c4 30px),
      linear-gradient(90deg, transparent 28px, #c4c4c4 30px);
    background-color: var(--color-beige);
    background-size: 30px 30px;
  }

  .wrapper {
    font-family: "Chicle", cursive;

    color: var(--color-orange);

    cursor: pointer;

    width: 35vw;
    height: 35vw;
    background-color: var(--color-white);
    border-radius: 12px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    box-shadow: 5px 5px 10px 10px rgb(136, 136, 136);
    transition: all var(--animation-duration) ease;
  }

  .wrapper:hover {
    transform: scale(1.05);
  }

  .solo-play__title {
    font-size: 6vw;
    color: var(--color-orange);
    transition: all var(--animation-duration) linear;
  }

  .solo-play__wrapper:hover {
    .solo-play__title {
      display: none;
    }

    .solo-play__info-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  .solo-play__info-wrapper {
    display: none;
  }

  @font-face {
    font-family: "GmarketSansMedium";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  .solo-play__info {
    font-family: "GmarketSansMedium";
    color: black;
    font-size: 1vw;
  }

  .cs-quiz__img {
    width: 30vw;
    margin-bottom: 2rem;
  }

  .battle-play__title {
    font-size: 6vw;
    color: var(--color-dark-red);
  }

  .battle-play__info-wrapper {
    display: none;
  }

  .battle-play__wrapper:hover {
    .battle-play__title {
      display: none;
    }

    .battle-play__info-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  .battle-play__info {
    font-size: 1vw;
    font-family: "GmarketSansMedium";
    color: black;
  }

  .go-to-home {
    z-index: 100;
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
`;
