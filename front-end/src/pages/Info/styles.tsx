import styled from "styled-components";

export const SMain = styled.main`
  height: 100%;

  @font-face {
    font-family: "GmarketSansMedium";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  font-family: "GmarketSansMedium";

  .three-canvas {
    position: fixed !important;
    left: 0 !important;
    top: 0 !important;
  }

  .sections {
    position: relative;
    z-index: 1;
  }

  .section {
    padding: 5rem;
    height: 100vh;
  }

  .section h2 {
    margin: 0;
    font-size: 7vmin;
  }

  .section p {
    margin: 0;
    font-size: 2.5vmin;
  }

  .section:nth-child(odd) {
    text-align: right;
  }

  .go-to-install {
    background-color: var(--color-yellow);
    color: var(--color-white);
    position: absolute;
    bottom: 25rem;
    left: 75%;
    transform: translateX(-50%);
    width: 8vw;
    height: 3rem;
    border-radius: 50%;
    border: 3px solid black;
    /* padding: 0.5rem 0.8rem; */
    font-size: 1.6rem;
    font-family: "Chicle", cursive;
  }

  .go-to-home {
    /* z-index: 100; */
    background-color: var(--color-green);
    color: var(--color-white);
    position: fixed;
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
