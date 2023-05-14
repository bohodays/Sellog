import styled from "styled-components";

export const SSection = styled.section`
  height: 100%;
  width: 70%;
  background-color: #4f5d7d;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 1vw;
  .goHome__button {
    cursor: pointer;
    /* display: flex;
    justify-self: end; */
    position: absolute;
    bottom: 3vh;
    right: 3vw;
    font-size: 1.7rem;
    color: #d8b904;
  }
`;

export const SArticle = styled.article`
  display: flex;
  justify-content: space-evenly;
`;
