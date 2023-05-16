import styled from "styled-components";

export const SMain = styled.main`
  position: relative;
  height: 100%;
  background-color: var(--color-beige);
  border-color: black;
  border: 12px solid;

  .sticker1 {
    position: absolute;
    left: 6vw;
    bottom: 3rem;
    width: 8vw;
  }
  .sticker2 {
    position: absolute;
    width: 9vw;
    right: 5vw;
    top: 15vh;
  }
  .goHome__button {
    cursor: pointer;
    cursor: pointer;
    /* display: flex;
    justify-self: end; */
    position: absolute;
    bottom: 3vh;
    right: 3vw;
    font-size: 1.7rem;
    color: black;
    transition: all 300ms linear;
  }

  .goHome__button:hover {
    color: var(--color-yellow);
  }
`;

export const SHeader = styled.header`
  height: 20%;
  margin-bottom: 3%;

  .home {
    /* position: absolute; */
    width: 0px;
    height: 0px;
    border-top: 89px solid black;
    border-left: 0px solid transparent;
    border-right: 593px solid transparent;
  }
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
    transform: rotate(-9.93deg);
  }
  .title__container {
    display: flex;
    margin-inline: 20%;
    font-family: "Chicle", cursive;
    font-size: 4rem;
    justify-content: center;
    transform: translateY(-2rem);
  }
  .title__text {
    margin: 0%;
  }
  .developer {
    background-color: var(--color-orange);
    text-align: center;
    font-family: "Chicle", cursive;
    margin-right: 3%;
    padding-inline: 5%;
    transform: rotate(3.16deg);
  }
  .feed {
    background-color: var(--color-orange);
    text-align: center;
    padding-inline: 5%;
    transform: rotate(-1.82deg);
  }
`;
export const SBody = styled.div`
  margin-inline: 10%;
  /* margin-block: 3%; */
  height: 70%;
  justify-content: space-evenly;
  display: flex;
  width: 85vw;
  /* overflow-y: auto; */
  ::-webkit-scrollbar {
    display: none;
  }
  .feed__box {
    /* height: 90%; */
    overflow-y: auto;
    width: 60%;
    ::-webkit-scrollbar {
      /* display: hidden; */
      visibility: hidden;
    }
    .intersection__div {
      height: 15%;
      /* background-color: red; */
    }
  }
`;

export const SSection = styled.section`
  /* width: 18%; */
  width: 16vw;
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */

  .mostviewed {
    background-color: var(--color-white);
    margin-block: 5%;
    border-radius: 20px;
    height: 90%;
    /* padding: 4%; */
    padding-inline: 1vw;
    /* padding-block: 8%; */
    box-shadow: 2px 2px 1px 1px grey;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .mostviewed ::-webkit-scrollbar {
    width: 0rem;
  }
  .mostviewed__title {
    font-size: 1.1rem;
    margin-block: 1rem;
  }
  .mostview__element {
    display: flex;
    overflow-x: hidden;
    justify-self: center;
    width: 16vw;
    /* margin-block: 10%; */
    transition: all 300ms linear;
    border-radius: 12px;
    /* margin-block: 0.7rem; */
    /* padding: 0.5rem 1rem; */
  }

  .mostview__element:hover {
    background: #e2e2e2;
  }

  .mostviewed__list {
    overflow: auto;
    a {
      color: black;
    }
  }
  .mostview__content {
    display: flex;
    flex-direction: column;
    width: 14vw;
    padding-inline: 0.4vw;
    margin-block: 1vh;
    text-align: justify;

    /* justify-items: end; */
  }
  .mostview__count {
    display: flex;
    justify-content: end;
  }
  .view__wrapper {
    display: flex;
    align-items: center;
    justify-content: end;
    font-size: 15px;
    p {
    }
    /* align-items: center; */
    /* height: 2vh; */
  }
`;
