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
    padding-left: 1.5rem;

    span {
      font-family: "ZCOOL KuaiLe", sans-serif;
      color: var(--color-white);
      font-size: 1.5rem;
    }
  }

  .title {
    font-size: 4rem;
    font-family: "Chicle", cursive;
    margin: 0;
    padding-top: 2.5rem;

    padding-bottom: 2.5rem;
    color: #4b5a7d;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    transform: rotate(-3deg);
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
    top: 5rem;
    right: 4.2rem;
  }

  .retro__spring {
    top: -3rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .retro__img {
    width: 6rem;
    top: 2.5rem;
    right: 1.2rem;
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
`;
