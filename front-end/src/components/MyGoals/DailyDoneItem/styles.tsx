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

  .doneItem__title {
    font-size: 0.85vw;
    padding: 0vh 0.2vw;
  }

  .doneItem__msg {
    font-size: 0.9vw;
    padding: 0.2vh 0.2vw;
  }

  .doneItem__link {
    a {
      /* color: rgb(255, 157, 157); */
      color: black;
      word-wrap: break-word;
      text-decoration: underline;
    }
  }
`;
