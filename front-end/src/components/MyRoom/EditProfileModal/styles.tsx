import styled from "styled-components";

export const SModal = styled.div`
  height: 20%;
  width: 20%;
  position: absolute;
  top: 40vh;
  left: 5vw;
  background-color: #f3ebd9;
  border: 3px solid black;

  .button__yes {
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    /* justify-self: end; */
    /* align-self: flex-end; */
    height: 1.5rem;
    /* width: 4rem; */
    margin: 0%;
    margin-bottom: 3%;

    font-family: "Chicle";
    font-size: 1rem;

    background-color: #ffcc00;
    border: solid 1px;
    border-radius: 1rem 1rem 1rem 1rem;
    box-shadow: 1px 1px 1px 1px grey;
    width: 5vw;
    text-align: center;
    p {
      margin: 0%;
      padding: 0%;
    }
  }
  .box__button {
    display: flex;
  }
`;
