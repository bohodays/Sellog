import styled from "styled-components";

export const SProfile = styled.section`
  height: 100vh;
  width: 30vw;
  background-color: #e4d1b0;

  .head {
    margin-top: 2%;
    padding-left: 5%;
    height: 8vh;
    font-size: 3rem;
    font-family: "Chicle";
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
    /* position: absolute; */
    height: 100%;
  }
  .body__profile {
    height: 80vh;
    text-align: center;
  }

  .img__profile {
    width: 7rem;
    height: 7rem;
    transform: matrix(1, 0.1, -0.1, 0.99, 0, 0);
  }
  .container__baseinfo {
    display: flex;
    justify-content: space-around;
    text-align: center;
    font-family: "ZCOOL KuaiLe", cursive;
    padding-inline: 5%;
    /* height: 40%; */
    /* .username {
      
    } */
  }
  .container__userinfo {
    padding-right: 2vw;
    width: 50%;

    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    .username {
      font-family: "GmarketSansMedium", "sans-serif";
      font-size: 1.3rem;
      padding-right: 10%;
    }
  }

  .point__container {
    display: flex;
    justify-content: space-evenly;
    margin-top: 4vh;
    height: fit-content;
    width: fit-content;

    text-align: center;
    align-items: center;
    background-color: #dfc490;
    box-shadow: 1px 1px 1px 1px grey;
    transform: rotate(3deg);
    img {
      width: 30%;
    }
  }

  .bottom__profile {
    margin-block: 4%;
    margin-inline: 4%;
    width: 90%;
    display: flex;
    align-content: center;
    justify-content: space-between;
    font-size: 1.4rem;
    P {
      font-family: "GmarketSansMedium";
      font-size: 1.2rem;
      width: 70%;
    }
  }

  .container__habit {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding-inline: 8%;
    font-family: "Slackey", sans-serif;
    font-size: large;
    font-weight: 700;
    margin-block: 4%;
    .head__habit {
      display: flex;
      height: 2rem;
      padding-inline-start: 2rem;
      /* justify-content: space-around; */
    }
    .head__habit-today {
      margin-inline: 5vw;
      margin-inline-start: 9vw;
    }
    .head__habit-todo {
      margin-inline-start: 2vw;
      width: 9vw;
    }
  }
  .container__habit-stats {
    display: flex;
    width: 99%;
    /* border: solid black; */
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
  }
  .progress__bar {
    width: 13vw;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-block: 3%;

    /* background-color: red; */
  }
  .progress__bar--github {
    background-color: #484743;
    transform: rotate(-1.85deg);
  }
  .progress__bar--blog {
    background-color: #c7553f;
    transform: rotate(0.21deg);
  }
  .progress__bar--algorithm {
    background-color: #e1b34b;
    transform: rotate(-1.48deg);
  }
  .progress__bar--CS {
    background-color: #6eb78d;
    transform: rotate(0.52deg);
  }
  .progress__bar--CS:hover {
    cursor: pointer;
  }
  .progress__bar--Feed {
    background-color: #5488a1;
    transform: rotate(-1.21deg);
  }

  .checked__today {
    align-self: center;
    justify-self: center;
    width: 3vw;
    height: 3vw;
    font-size: 1.5rem;
    text-align: center;
  }

  .button__goal {
    height: 2rem;
    width: 6rem;
    display: flex;
    /* text-align: center; */
    justify-content: center;
    align-self: flex-end;
    background-color: #ffcc00;
    border: solid 3px;
    border-radius: 1rem 1rem 1rem 1rem;
    box-shadow: 1px 1px 1px 1px grey;
    font-family: "Chicle", "GmarketSansMedium";
    font-size: 1.3rem;
    a {
      color: black;
    }
  }
  .container__contact {
    /* border: solid 1px; */
    margin-top: 2%;
    display: flex;
    height: 8%;
    justify-content: space-around;
  }
  .contact__text {
    /* border: solid 1px; */
    /* padding-top: 3%; */
    font-size: 1rem;
    font-family: "Slackey", cursive;
    color: #817d7d;
  }
  .contact__info {
    display: flex;
    flex-direction: column;
    p {
      margin: 0%;
      color: black;
    }
  }
  .sticker__github {
    margin: 8px;
    width: 2.5rem;
  }
  .sticker__tistory {
    width: 3.5rem;
  }
`;
