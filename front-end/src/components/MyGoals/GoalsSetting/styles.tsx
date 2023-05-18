import styled from "styled-components";

export const SSection = styled.section<any>`
  height: 100%;
  width: 30%;
  background-color: #bac8c6;
  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: none;
  }

  .title__wrapper {
    position: relative;
    padding-left: 2vw;
    /* text-align: center; */

    span {
      text-align: center;
      font-family: "ZCOOL KuaiLe", sans-serif;
      color: white;
      font-size: 1.5vw;
      text-shadow: 1px 2px gray;
      padding-left: 0.5vw;
    }
  }

  .title {
    font-size: 3.5vw;
    font-family: "Chicle", cursive;
    margin: 0;
    padding-top: 4vh;

    padding-bottom: 5vh;
    color: #4b5a7d;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    transform: rotate(-3deg);
  }

  .info__btn {
    position: absolute;
    top: 5vh;
    left: 1.5vw;
    font-size: 3vh;
    color: grey;
    z-index: 5;
  }

  .info__message {
    position: absolute;
    top: 7vh;
    left: 2.5vw;
    font-size: 0.8vw;
    font-weight: bold;
    background-color: #2c2e2ef4;
    height: 30vh;
    width: 23vw;
    color: #f4f4f4;
    padding: 2px 3px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    text-align: start;

    padding: 1rem;
    padding-inline: 1.5rem;
    p {
      margin-block: 0.5vh;
      line-height: 3vh;
    }
    span {
      color: red;
    }
  }

  .content__wrapper {
    position: relative;
    text-align: center;
    margin: auto;
    margin-top: 3.5rem;
    width: 75%;
    /* height: 80%; */
    background-color: #f3ebd9;
    border-radius: 20px;
  }

  .sticker {
    position: absolute;
  }

  .retro__pencil {
    top: 1rem;
    right: 2rem;
  }

  .retro__work {
    top: 3.5vw;
    right: 6vw;
  }

  .retro__spring {
    top: -3rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .retro__img {
    width: 4vw;
    top: 4vh;
    right: 1vw;
  }

  .retro__yellow-flower {
    bottom: 1rem;
    width: 5rem;
    left: 1rem;
  }

  .retro__smile-light {
    bottom: 1rem;
    right: 1rem;
  }

  .goback__button {
    position: absolute;
    width: 6rem;
    top: 3rem;
    left: 0.1rem;
    font-size: 1.5rem;
    a {
      color: black;
    }
  }
`;
