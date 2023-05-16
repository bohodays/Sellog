import styled, { css } from "styled-components";

export const SProfile = styled.section`
  height: 100%;
  width: 30%;
  background-color: #e4d1b0;

  .head {
    margin-top: 2%;
    padding-left: 5%;
    height: 8%;
    font-size: 3rem;
    font-family: Chicle, cursive;
    color: #cb4f4f;
    text-shadow: 3px 3px #484743;
    transform: rotate(-7.58deg);
    margin-bottom: 12%;
  }

  .sticker__smilebottom {
    position: absolute;
    width: 7vw;
    left: 20vw;
    top: 5vh;
  }
  .sticker__coin {
    /* position: absolute; */
    height: 100%;
  }
  .body__profile {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .img__profile {
    width: 9vw;
    height: 9vw;
    transform: matrix(1, 0.1, -0.1, 0.99, 0, 0);
  }
  .container__baseinfo {
    display: flex;
    justify-content: space-around;
    text-align: center;
    font-family: ZCOOL KuaiLe, cursive;
    padding-inline: 5%;

    .username {
      font-size: 1.3rem;
      font-family: ZCOOL KuaiLe;
      padding-right: 10%;
    }
  }
  .container__userinfo {
    padding-right: 2vw;
    width: 50%;

    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
  }
  .point__container {
    display: flex;
    justify-content: space-evenly;
    margin-top: 4vh;
    height: 25%;
    width: 45%;

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
    margin-top: 4%;
  }
  .container__edit {
    display: flex;
    flex-direction: column;
    /* border: solid 1px; */
    /* padding-inline: 4%; */
    padding-block: 2%;
    align-items: self-start;
    p {
      width: 45%;
    }
    input {
      outline: none;
      background-color: rgb(255, 255, 255, 0);
      border: none;
      border-bottom: #484743 solid 1px;
      width: 50%;
      height: 1.2rem;
      font-size: 1.1rem;
    }
    .error {
      /* background-color: #ffffff; */
      border-bottom: red solid 2px;
      /* outline: #cb4f4f; */
    }
  }

  .box__motto {
  }
  .box__email {
  }
  .box__tistory {
  }
  .box__github {
  }
  .box__phonenum {
  }
  .box__edit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-block: 3%;
    width: 90%;
  }

  .button__goal {
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    margin: 0%;
    padding-inline: 3%;

    font-family: "Chicle";
    font-size: 1.2rem;

    background-color: #ffcc00;
    border: solid 3px;
    border-radius: 1rem 1rem 1rem 1rem;
    box-shadow: 1px 1px 1px 1px grey;
    text-align: center;
    p {
      margin: 0%;
      padding: 0%;
    }
  }
  .container__contact {
    /* border: solid 1px; */
    margin-top: 2%;
    display: flex;
    justify-content: space-around;
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
    width: 4rem;
    left: 5vw;
    bottom: 0vh;
  }
  .button__edit {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 3%;
  }

  .empty {
    border: 3px solid red !important;
    border-radius: 4px;
    padding: 0.8rem 0.5rem;
  }
  .withdraw__button {
    display: flex;
    height: 4vh;
    width: fit-content;
    margin: 0.5vw;
    padding-inline: 1vw;

    font-family: "ZCOOL KuaiLe";
    font-size: 1rem;

    background-color: #acacac;
    border: solid 3px;
    border-radius: 1rem 1rem 1rem 1rem;
    box-shadow: 1px 1px 1px 1px grey;
    text-align: center;
    p {
      height: fit-content;
    }
  }
  .withdraw__box {
    height: 20vh;
    display: flex;
    justify-content: end;
    align-items: end;
  }
`;
