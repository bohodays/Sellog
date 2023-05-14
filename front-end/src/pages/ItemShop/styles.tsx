import styled from "styled-components";

export const SMain = styled.main`
  height: 100vh;
  width: 100vw;
  position: relative;
  background-color: #1a1830;
  padding: 2%;

  .item__category--container {
    text-align: center;
    font-size: calc(2.5vw - 10px);
    font-weight: 900;
    font-style: italic;
    font-family: "Exo 2", sans-serif;
    color: yellow;
    padding: 0.5% 1.5%;
    margin-top: 5vh;
    margin-left: 2.5vw;
    border: 0.3rem solid rgba(137, 239, 245, 1);
    border-radius: 2rem;
    text-transform: uppercase;
    animation: flicker 1.5s infinite alternate;
    width: fit-content;
    height: fit-content;
    box-shadow: 0 0 0.25rem rgba(137, 239, 245, 1),
      inset 0 0 0.25rem rgba(137, 239, 245, 1),
      0 0 0.01rem var(--neon-border-color),
      inset 0 0 0.01rem var(--neon-border-color),
      0 0 0.5rem var(--neon-border-color),
      inset 0 0 0.5rem var(--neon-border-color);
  }

  /* .item__category--container::-moz-selection {
    background-color: var(--neon-border-color);
    color: var(--neon-text-color);
  }

  .item__category--container::selection {
    background-color: var(--neon-border-color);
    color: var(--neon-text-color);
  } */

  .item__category--container:focus {
    outline: none;
  }

  .item__category {
    cursor: pointer;
    padding: 23% 0%;
  }

  .item__category__selected {
    color: #f582dd;
    text-shadow: 0 0 0.25rem #f582dd, 0 0 1rem #f582dd;
    cursor: pointer;
    padding: 23% 0%;
  }

  @keyframes flicker {
    0%,
    19%,
    21%,
    23%,
    25%,
    54%,
    56%,
    100% {
      text-shadow: 
      /* -0.05rem -0.05rem 0.5rem #fff, 0.05rem 0.05rem 0.1rem #fff, */ 0
          0 0.25rem var(--neon-text-color),
        /* 0 0 2rem var(--neon-text-color), */
          /* 0 0 0.5rem var(--neon-text-color), 0 0 2rem var(--neon-text-color), */
          0 0 1rem var(--neon-text-color);

      box-shadow: 0 0 0.25rem rgba(137, 239, 245, 1),
        inset 0 0 0.25rem rgba(137, 239, 245, 1),
        0 0 0.01rem var(--neon-border-color),
        inset 0 0 0.01rem var(--neon-border-color),
        0 0 0.5rem var(--neon-border-color),
        inset 0 0 0.5rem var(--neon-border-color);
    }

    20%,
    24%,
    55% {
      /* text-shadow: none; */
      /* box-shadow: none; */
    }
  }

  .sign__title {
    font-family: Neoneon;
    color: #f582dd;
    font-size: calc(2.5vw - 5px);
  }

  .sign__title--container {
    font-family: "Exo 2", sans-serif;
    padding: 1% 3%;
    border: calc(1vw - 10px) solid #fff;
    border-radius: 0.5rem;
    text-transform: uppercase;
    animation: flicker2 1.5s infinite alternate;
    width: fit-content;
    height: fit-content;
  }

  @keyframes flicker2 {
    0%,
    19%,
    21%,
    23%,
    25%,
    54%,
    56%,
    100% {
      text-shadow: 
      /* -0.05rem -0.05rem 0.5rem hotpink, */ 0.05rem 0.05rem
          0.01rem hotpink,
        0 0 0.2rem hotpink, 0 0 1rem hotpink, 0 0 0.25rem hotpink,
        0 0 1rem hotpink, 0 0 0.5rem hotpink;
      box-shadow: 0 0 0.25rem rgba(137, 239, 245, 1),
        inset 0 0 0.2rem rgba(137, 239, 245, 1),
        0 0 0.5rem var(--neon-border-color),
        inset 0 0 0.5rem var(--neon-border-color),
        0 0 1rem var(--neon-border-color),
        inset 0 0 1rem var(--neon-border-color);
    }

    20%,
    24%,
    55% {
      box-shadow: none;
    }
  }
`;

export const SGhostContainer = styled.div<any>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 35%;

  position: absolute;
  bottom: ${(props) => (props.position === "bottom" ? "1.5%" : null)};
  left: ${(props) => (props.position === "bottom" ? "1.5%" : null)};
  top: ${(props) => (props.position === "top" ? "1.5%" : null)};
  right: ${(props) => (props.position === "top" ? "1.5%" : null)};

  .dot {
    width: calc(0.5vw);
    height: calc(0.5vw);
    background: #ffffff;
    border-radius: 50%;
  }

  .red__ghost {
    height: calc(4vw);
    width: calc(4vw);
  }

  .yellow__ghost {
    height: calc(4vw);
    width: calc(4vw);
    transform: scaleX(-1);
  }
`;

export const SContainer = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  /* margin-left: 7.5%; */
  /* margin-top: 3%; */
`;
