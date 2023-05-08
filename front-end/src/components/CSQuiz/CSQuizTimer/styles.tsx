import styled from "styled-components";

export const SDiv = styled.div<any>`
  margin-bottom: 3rem;
  font-family: "Offside", cursive;

  p {
    font-size: 1.5rem;
  }

  .nav {
    padding-top: 1rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .timer__wrapper {
    width: 3rem;
  }

  .timer__bar {
    height: 2rem;
    background-color: var(--color-white);
    width: 65vw;
    border-radius: 20px;
  }

  .progess {
    position: relative;
    width: ${(props) => ((120 - props.timer) / 120) * 100 + "%"};
    height: 100%;
    background-color: #ffa1a1;
    border-radius: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .timer__icon {
    font-size: 2.3rem;
    position: absolute;
    right: 0;
  }
`;
