import styled from "styled-components";

export const SMain = styled.main`
  position: relative;
  height: 100%;
  background-color: #000000;

  .go-to-info {
    position: absolute;
    top: 2rem;
    left: 2rem;
    z-index: 10;
    font-size: 2rem;
  }
`;

export const SButtonWrapper = styled.div<any>`
  /* z-index: ${(props) => (props.isVisible ? 100 : -1)}; */
  z-index: -1;
  /* opacity: ${(props) => (props.isVisible ? 1 : 0)}; */
  opacity: 0;
  transition: all var(--animation-duration) linear;
  position: absolute;
  bottom: 5rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-family: "omyu_pretty";

  .btn-info {
    margin-bottom: 2rem;
  }

  .btn {
    font-family: "omyu_pretty";
    --side-shadow-color: hsl(40, 100%, 30%);
    --ground-shadow-color: hsl(0, 0%, 10%);
    --background-color: hsl(40, 100%, 50%);
    --text-color: white;
    --font-size: 30pt;
    --basis-perspective: rotateX(20deg);
    font-size: var(--font-size);
    padding: 0.5em 1em;
    border: none;
    border-radius: 48%;
    background: var(--background-color);
    color: var(--text-color);
    box-shadow: 0 6px 0px var(--side-shadow-color),
      0 10px 12px var(--ground-shadow-color),
      inset 0 0px 0px var(--ground-shadow-color);
    transition: all 200ms ease-in-out;
    cursor: pointer;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;

    /* transform: translateX(-50%); */
    /* transform: translateX(-50%); */
  }

  .btn:hover {
    /* transform: translateY(5px); */
    box-shadow: 0 1px 0px var(--side-shadow-color),
      0 2px 4px var(--ground-shadow-color),
      inset 0 0px 0px var(--ground-shadow-color);
  }

  .btn:active {
    /* transform: translateY(6px); */
    box-shadow: 0 0px 0px var(--side-shadow-color),
      0 -1px 0px var(--ground-shadow-color),
      inset 0 4px 8px 2px var(--ground-shadow-color);
  }
`;
