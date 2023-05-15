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
    width: 30%;
  }

  .doneItem__left__category {
    text-align: center;
    padding: 0.6vh 0vw;
    border-bottom: 1px solid lightgrey;
    border-right: 1px solid lightgrey;
    font-weight: 600;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .doneItem__right__column {
    width: 70%;
  }

  .doneItem__title {
    font-size: 0.9vw;
  }

  .doneItem__right__category {
    text-align: center;
    font-weight: 600;
    padding: 0.6vh 0vw;
    border-bottom: 1px solid lightgrey;
    background-color: rgba(0, 0, 0, 0.06);
  }

  .doneItem__msg {
    font-size: 0.9vw;
    /* padding: 0.2vh; */
  }

  .doneItem__link {
    a {
      color: rgb(255, 157, 157);
      word-wrap: break-word;
      text-decoration: underline;
    }
  }
`;
