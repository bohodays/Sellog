import styled from "styled-components";

export const SMain = styled.main`
  height: 100%;
  width: 100%;
  position: relative;
  background-color: #1a1830;
  padding: 2%;

  .item__category--container {
    text-align: center;
    font-size: 2rem;
    font-weight: 900;
    font-style: italic;
    font-family: "Exo 2", sans-serif;
    color: yellow;
    padding: 0.5% 1.5%;
    /* margin-left: 1%; */
    margin-top: 3%;
    /* padding: 4rem 6rem 5.5rem; */
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

  .item__category--container::-moz-selection {
    background-color: var(--neon-border-color);
    color: var(--neon-text-color);
  }

  .item__category--container::selection {
    background-color: var(--neon-border-color);
    color: var(--neon-text-color);
  }

  .item__category--container:focus {
    outline: none;
  }

  .item__category {
    cursor: pointer;
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

  .item__category {
    padding: 25% 0%;
  }

  .sign__title {
    font-family: Neoneon;
    color: #f582dd;
    font-size: 3rem;
  }

  .sign__title--container {
    /* padding: 1%; */
    /* font-style: italic; */
    font-family: "Exo 2", sans-serif;
    padding: 1% 3%;
    /* padding: 4rem 6rem 5.5rem; */
    border: 0.4rem solid #fff;
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
    width: 11px;
    height: 11px;
    background: #ffffff;
    border-radius: 50%;
  }

  .red__ghost {
    height: 90px;
    width: 90px;
  }

  .yellow__ghost {
    height: 90px;
    width: 90px;
    transform: scaleX(-1);
  }
`;

export const SContainer = styled.div`
  display: flex;
  width: 100%;
  height: 70%;
  /* margin-left: 7.5%; */
  /* margin-top: 3%; */
`;
