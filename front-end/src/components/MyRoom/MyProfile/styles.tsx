import styled from "styled-components";

export const SProfile = styled.section`
  height: 100%;
  width: 30%;
  background-color: #e4d1b0;

  .head {
    margin-top: 2%;
    padding-left: 5%;
    height: 8%;
    font-size: 3.5rem;
    font-family: "Chicle", cursive;
    color: #cb4f4f;
    text-shadow: 3px 3px #484743;
    transform: rotate(-7.58deg);
    margin-bottom: 12%;
  }
  .sticker__smilebottom {
    position: absolute;
    width: 7rem;
    left: 20vw;
    top: 5vh;
  }
  .sticker__coin {
    width: 2%;
  }
  .profile__body {
    text-align: center;
  }
  .container__userinfo {
    display: flex;
    justify-content: space-around;
    text-align: center;
    font-family: "Slackey", cursive;

    img {
      width: 30%;

      transform: matrix(1, 0.1, -0.1, 0.99, 0, 0);
    }

    .username {
      font-size: 1.5rem;
    }
  }
  .container__habit {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-inline: 8%;
    font-family: "Slackey", cursive;
    font-size: large;
    font-weight: 700;
    height: 40%;
  }
  .container__habit-stats {
    display: flex;
    width: 95%;
    /* border: solid black; */
    justify-content: space-between;
    align-items: center;
  }
  .progress__bar {
    width: 70%;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-block: 3%;

    /* background-color: red; */
  }
  .progress__bar--github {
    background-color: #484743;
  }
  .progress__bar--blog {
    background-color: #c7553f;
  }
  .progress__bar--algorithm {
    background-color: #e1b34b;
  }
  .progress__bar--CS {
    background-color: #6eb78d;
  }
  .progress__bar--Feed {
    background-color: #5488a1;
  }
  .container__contact {
    margin-top: 5%;
    display: flex;
    justify-content: space-around;
    align-items: start;
    text-align: start;
  }
  .contact__text {
    border: solid 1px;
    padding-top: 3%;
    font-size: 1rem;
    font-family: "Slackey", cursive;
    color: #817d7d;
  }
  .contact__info {
    display: flex;
    flex-direction: column;
    p {
      margin: 0%;
    }
  }
  .sticker__github {
    position: absolute;
    left: 2vw;
    width: 2.7rem;
    bottom: 1.6vh;
  }
  .sticker__tistory {
    position: absolute;
    width: 4%;
    left: 5vw;
    bottom: 0vh;
  }
`;
