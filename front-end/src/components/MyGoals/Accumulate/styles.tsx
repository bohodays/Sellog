import styled from "styled-components";

export const SSection = styled.section`
  background-color: #f3ebd9;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40vh;
  width: 30vw;
  border-radius: 20px;
  /* border: 2px solid #423e33; */
  box-shadow: 5px 5px 3px #423e33;

  .goal_logo {
    height: 70px;
    width: 70px;
  }

  .steps__wrapper {
    display: flex;
    justify-content: center;
    /* align-items: center; */
  }

  .accumulate__container {
    text-align: center;
    height: 90%;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    position: relative;
  }

  .number {
    background-color: #ff9d9d;
    border-radius: 20px;
    /* width: 80%; */
    padding: 8px 18px;
    font-family: "ZCOOL KuaiLe", sans-serif;
    text-align: center;
    font-weight: 600;
    font-size: 1vw;
  }
  .acc__day__wrapper {
    width: 80%;
    height: 3vh;
  }
  .goal__container {
    border-radius: 20px;
    background: rgb(255, 109, 109);
    background: linear-gradient(
      140deg,
      rgba(255, 109, 109, 1) 0%,
      rgba(254, 218, 206, 1) 100%
    );
    display: flex;

    justify-content: space-between;
  }
  .reward__container {
  }
  .start__div {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    background-color: #494c53;
    font-size: 0.8rem;
  }

  .acc__reward__wrapper {
    width: 80%;
  }
  .reward__container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: white;
  }
  .reward__div {
    background-color: #ffb300;
    color: white;
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .reward2 {
    background-color: #ffb300;
  }
  .reward3__div {
    color: white;
    background-color: #a65401;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    font-size: 0.8rem;
  }
  .inner_idv {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 1.6rem;
    width: 1.6rem;
    border-radius: 50%;
    background-color: #f4940c;
  }
  .reward3 {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 1.6rem;
    width: 1.6rem;
    border-radius: 50%;

    background-color: #ab5a00;
  }

  .recommend {
    font-family: "GmarketSansMedium";
    font-size: 1vw;
    margin-top: 1vh;
  }

  .hidden {
    visibility: hidden;
  }

  .reward__hidden {
    visibility: hidden;
  }

  .info__btn {
    position: absolute;
    top: 0vh;
    left: 0vw;
    font-size: 3vh;
    color: grey;
    z-index: 5;
  }

  .info__message {
    position: absolute;
    top: 2vh;
    left: 1.2vw;
    font-size: 0.7vw;
    background-color: white;
    height: 30vh;
    width: 23vw;
    color: black;
    padding: 2px 3px;
    border-radius: 20px;
  }
`;
