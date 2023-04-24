import styled from "styled-components";

export const SMain = styled.main`
  height: 100%;
  position: relative;

  .info {
    width: 100%;
    text-align: center;
    position: absolute;
    z-index: 10;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
    font-family: "Press Start 2P", cursive;
    font-size: 1.1rem;
    -webkit-animation: blink 0.5s ease-in-out infinite alternate;
    -moz-animation: blink 0.5s ease-in-out infinite alternate;
    animation: blink 0.5s ease-in-out infinite alternate;
    user-select: none;
  }

  .visible {
    opacity: 1;
  }

  @-webkit-keyframes blink {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-moz-keyframes blink {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes blink {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
