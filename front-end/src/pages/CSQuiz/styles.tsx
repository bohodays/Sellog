import styled from "styled-components";

export const SMain = styled.main`
  position: relative;
  height: 100%;
  background-color: var(--color-beige);
  background-color: var(--color-beige);

  .go-to-home {
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

  .main__info {
    background-color: var(--color-beige);
    height: 75%;
    font-family: "Chicle", cursive;
    font-size: 11rem;
    color: #cb4f4f;
    user-select: none;
  }

  .quiz__select {
    background-color: var(--color-green);
    height: 25%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .MuiPaper-root {
      width: 500px;
    }

    .MuiMobileStepper-dots {
      display: none;
    }

    .button__select {
      /* position: absolute; */
      background-color: var(--color-yellow);
      color: var(--color-blue);
      width: 8vw;
      height: 3rem;
      border-radius: 50%;
      border: 3px solid var(--color-blue);
      padding: 0.5rem 0.8rem;
      font-size: 1.6vw;
      font-family: "Chicle", cursive;
      user-select: none;
    }

    .steps__wrapper {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 60vw;
      margin-bottom: 1rem;
    }

    .steps {
      width: 20vw;
      white-space: nowrap;
      text-align: center;
      margin: 0;
      color: white;
      font-family: "Chicle", cursive;
      font-size: 2.5vw;
    }

    .nav {
      color: white;
      font-size: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      cursor: pointer;
      /* user-select: none;
      background: unset;
      border: unset; */
    }
  }

  .check-pattern {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: absolute;
    left: 50%;
    width: 80%;
    height: 75%;
    transform: translateX(-50%);
    background-color: var(--color-beige);
    border: 1px solid #c4c4c4;
    background-image: linear-gradient(0deg, transparent 28px, #c4c4c4 30px),
      linear-gradient(90deg, transparent 28px, #c4c4c4 30px);
    background-color: var(--color-beige);
    background-size: 30px 30px;

    p {
      margin: 0;
    }

    .sticker1 {
      position: absolute;
      right: 10vw;
      top: 4vw;
      width: 14vw;
    }

    .sticker2 {
      position: absolute;
      left: 6vw;
      bottom: 3rem;
      width: 16vw;
      transform: rotate(15deg);
    }
  }
`;

// export const SSection = styled.section`
//   height: 100%;
//   display: flex;
// `
