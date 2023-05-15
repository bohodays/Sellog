import styled from "styled-components";

export const SSection = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;

  height: 100%;
  background: linear-gradient(-80deg, #db929d 50%, #fbf4e4 50%);

  .character__wrapper {
    position: relative;
    width: 35vw;
    height: 60%;
    /* transform: translateY(-3rem); */
  }

  .page-state__wrapper {
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    background-color: var(--color-yellow);

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: "Chicle";
    font-size: 2vw;

    /* margin: 5% auto; */
    border: 6px solid #000000;

    transition: all 300ms linear;
  }

  .page-state__wrapper:hover {
    color: var(--color-white);
  }

  .page-state {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-family: "Chicle";
    font-size: 2vw;
  }

  @font-face {
    font-family: "GmarketSansMedium";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  .my-character-name {
    font-family: "GmarketSansMedium";

    font-size: 1.5vw;
    margin: auto;
    text-align: center;
    margin-top: 2rem;
  }

  .other-character-name {
    font-family: "GmarketSansMedium";

    font-size: 1.5vw;
    margin: auto;
    text-align: center;
    margin-top: 2rem;
  }

  .correct-count {
    font-family: "GmarketSansMedium";

    font-size: 1.5vw;
    margin: auto;
    text-align: center;
    margin-top: 1rem;
  }

  .result {
    position: absolute;
    top: -7rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-size: 5vw;

    font-family: "Chicle";
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

  .answer {
    font-family: "Chicle", cursive;
    cursor: pointer;
    background-color: var(--color-yellow);
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 8vw;
    height: 3rem;
    border-radius: 50%;
    border: 3px solid black;
    font-size: 1.5vw;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .explanation__wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 32vw;
    height: 32vw;
    background-color: var(--color-white);

    border-radius: 12px;

    opacity: 0;
    z-index: -10;

    transition: all 300ms ease-in;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    padding: 1rem;
  }

  .answer:hover + .explanation__wrapper {
    opacity: 1;
    z-index: 100;
  }

  .explanation {
    font-family: "GmarketSansMedium";
  }
`;
