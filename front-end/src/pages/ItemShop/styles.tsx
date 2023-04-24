import styled from "styled-components";

export const SMain = styled.main`
  height: 100%;
  width: 100%;
  position: relative;
  background-color: #1a1830;
  padding: 5%;

  .item__category-container {
    margin-top: 8%;
    font-size: 2rem;
    font-weight: 900;
    /* font-style: italic; */
    font-family: "Exo 2", sans-serif;
    color: yellow;
    padding: 1% 3%;
    /* padding: 4rem 6rem 5.5rem; */
    border: 0.3rem solid #fff;
    border-radius: 2rem;
    text-transform: uppercase;
    animation: flicker 1.5s infinite alternate;
    width: fit-content;
    height: fit-content;
  }

  .item__category-container::-moz-selection {
    background-color: var(--neon-border-color);
    color: var(--neon-text-color);
  }

  .item__category-container::selection {
    background-color: var(--neon-border-color);
    color: var(--neon-text-color);
  }

  .item__category-container:focus {
    outline: none;
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
      text-shadow: -0.2rem -0.2rem 1rem #fff, 0.2rem 0.2rem 1rem #fff,
        0 0 2rem var(--neon-text-color), 0 0 4rem var(--neon-text-color),
        0 0 6rem var(--neon-text-color), 0 0 8rem var(--neon-text-color),
        0 0 10rem var(--neon-text-color);

      box-shadow: 0 0 0.5rem #fff, inset 0 0 0.5rem #fff,
        0 0 2rem var(--neon-border-color),
        inset 0 0 2rem var(--neon-border-color),
        0 0 4rem var(--neon-border-color),
        inset 0 0 4rem var(--neon-border-color);
    }

    20%,
    24%,
    55% {
      text-shadow: none;
      box-shadow: none;
    }
  }

  .item__category {
    padding: 25% 0%;
  }
`;

export const SGhostContainer = styled.div<any>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;

  position: absolute;
  bottom: ${(props) => (props.position === "bottom" ? "5%" : null)};
  left: ${(props) => (props.position === "bottom" ? "5%" : null)};
  top: ${(props) => (props.position === "top" ? "5%" : null)};
  right: ${(props) => (props.position === "top" ? "5%" : null)};

  .dot {
    width: 11px;
    height: 11px;
    background: #ffffff;
    border-radius: 50%;
  }
`;
