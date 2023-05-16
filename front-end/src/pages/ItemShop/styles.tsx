import styled from "styled-components";

export const SMain = styled.main`
  height: 100vh;
  width: 100vw;
  position: relative;
  background-color: #1a1830;
  padding: 2vw;

  .left__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 2.5vw;
  }

  .item__category--container {
    text-align: center;
    font-size: calc(2.5vw - 10px);
    font-weight: 900;
    font-style: italic;
    font-family: "Exo 2", sans-serif;
    color: yellow;
    padding: 0.5vh 1vw;
    margin-top: 5vh;
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
  bottom: ${(props) => (props.position === "bottom" ? "2vh" : null)};
  left: ${(props) => (props.position === "bottom" ? "1.5vw" : null)};
  top: ${(props) => (props.position === "top" ? "2vh" : null)};
  right: ${(props) => (props.position === "top" ? "1.5vw" : null)};

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

  .goHome__button {
    position: fixed;
    bottom: 3vh;
    right: 3vw;
    height: 4vh;
    cursor: pointer;
    color: var(--neon-border-color);
  }

  .mycoin__box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    align-items: center;
    border: 3px solid rgba(137, 239, 245, 1);
    padding: 1vh;
    margin-top: 3.5vh;
    border-radius: 20px;

    p {
      font-size: 0.8vw;
    }
  }
  .mycoin__wrapper {
    color: white;
    display: flex;
    align-items: center;
    font-size: 0.9vw;
    font-weight: bold;
    margin-top: 0.3vh;
  }

  .coin__icon {
    height: 3vh;
    animation: rotate_image 1.1s linear 2;
    transform-origin: 50% 50%;
  }

  .coin__icon:hover {
    animation: rotate_image 1.1s linear infinite;
    transform-origin: 50% 50%;
  }

  @keyframes rotate_image {
    100% {
      transform: rotateY(360deg);
    }
  }
`;
