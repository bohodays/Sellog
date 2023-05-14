import styled from "styled-components";

export const SSection = styled.section`
  height: 100vh;
  width: 40vw;
  background-color: #e4d1b0;
  transform: translateX(-100%);
  animation: slide-in 1s ease-out forwards;
  padding: 0.8vw;
  overflow-y: auto;
  overflow-x: hidden;

  .toshop__button {
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.5rem;
    width: fit-content;
    margin-bottom: 3%;
    margin-inline: 3%;
    font-family: "Chicle";
    font-size: 1.1rem;

    background-color: #ffcc00;
    border: solid 3px;
    border-radius: 1rem 1rem 1rem 1rem;
    box-shadow: 1px 1px 1px 1px grey;
    width: 5vw;
    text-align: center;
    p {
      margin: 0%;
      padding: 0%;
    }
  }

  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 12px;
    border: 1px solid #f0f0f0;
  }

  @keyframes slide-in {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  .title__wrapper {
    display: flex;
  }

  .title {
    font-family: "Chicle";
    color: #cb4f4f;
    font-weight: 500;
    text-shadow: 0px 8px 6px rgba(0, 0, 0, 0.25);
    transform: rotate(-1deg);
    font-size: 2.5vw;
    margin-left: 1vw;
    margin-top: 0.5vw;
  }

  .blueeye__img {
    height: 8vh;
  }

  .categories__box {
    display: flex;
    justify-content: center;
  }

  .category__btn--wrapper {
    margin: 0.5vw 0.4vw;
    padding: 0.2vw;
    border: 3px solid #458b96;
    border-radius: 5px;
  }

  .selected__btn--wrapper {
    background-color: #458b96;
  }

  .category__btn {
    font-family: "Chicle";
    font-size: 1.2vw;
    padding: 0.2vw;
    background-color: #f5eed7;
    color: #4e8c95;
    width: 5vw;
    border: 1.5px solid #458b96;
    border-radius: 5px;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
  }

  .category__btn--selected {
  }
`;
