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
`;

export const SHeader = styled.header`
  height: 20%;
  margin-bottom: 7%;

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
export const SBody = styled.body`
  margin-inline: 10%;
  margin-block: 3%;
  height: 70%;
  justify-content: space-evenly;
  display: flex;
`;

export const SSection = styled.section`
  width: 18%;
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  input {
    width: 95%;
    height: 15%;
  }
  .search {
    background-color: var(--color-white);
    margin-bottom: 10%;
    border-radius: 20px;
    /* height: 40%; */
    padding: 10%;
    padding-bottom: 20%;
    box-shadow: 2px 2px 1px 1px grey;
    overflow-y: hidden;
  }
  .keyword__button {
    background-color: var(--color-dark-white);
    border-radius: 4px;
    margin: 1px;
  }
  .mostviewed {
    background-color: var(--color-white);
    margin-block: 5%;
    border-radius: 20px;
    /* height: 40%; */
    padding: 4%;
    padding-inline: 8%;
    box-shadow: 2px 2px 1px 1px grey;
  }
  .mostviewed__list {
    padding: 5%;
  }
`;

export const SArticle = styled.article`
  width: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin: 0px;
  }
  .feed__card {
    width: 95%;
    height: 25%;

    /* margin-block: 3%; */
    padding-inline: 3%;
    padding-block: 1%;

    display: flex;
    flex-direction: column;
    justify-content: space-around;

    background-color: white;
    border-radius: 16px;
    box-shadow: 2px 2px 1px 1px grey;

    font-size: large;
    font-weight: 600;
  }
  .feed__card-info {
    display: flex;
    justify-content: space-between;
  }
  .feed__card-source {
    text-align: left;
    font-size: medium;
    font-weight: 400;
  }
  .feed__card-detail {
    display: flex;
    justify-content: end;
    width: 30%;
    font-size: small;
    font-weight: 400;
    p {
      padding-inline: 2%;
    }
  }
`;
