import styled from "styled-components";

export const SDiv = styled.div`
  font-size: 1vw;
  cursor: default;
  /* padding: 8px; */
  background-color: rgba(255, 255, 255, 0.7);

  .doneItem__container {
    display: flex;
    text-align: center;
    border-bottom: 1px solid lightgrey;
  }

  .doneItem__left__column {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    word-wrap: break-word;
    justify-content: center;
  }

  .doneItem__title {
    font-size: 0.85vw;
    /* padding: 0.5vh 0.2vw; */
    font-family: "GmarketSansMedium";
    padding: 0vw 0.2vw;
  }

  .doneItem__right__column {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    /* word-wrap: break-word; */
    justify-content: center;
  }

  .doneItem__msg {
    font-size: 0.9vw;
    font-family: "GmarketSansMedium";
    padding: 0vw 0.2vw;
    flex: 0 0 100%;
  }

  .doneItem__link {
    a {
      /* color: rgb(255, 157, 157); */
      color: black;
      word-break: break-word;
      text-decoration: underline;
      font-family: "Quantico";
      flex: 0 0 100%;
    }
  }
`;
