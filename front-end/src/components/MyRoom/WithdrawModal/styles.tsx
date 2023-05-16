import styled from "styled-components";

export const SWithdrawModal = styled.div`
  height: 20%;
  width: 20%;
  position: absolute;
  top: 40vh;
  left: 5vw;
  background-color: #f3ebd9;
  border: 3px solid black;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .modal__content {
    padding-inline: 10%;
  }
  a {
    color: black;
    border: black solid 1px;
  }

  .button__yes {
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    /* justify-self: end; */
    /* align-self: flex-end; */
    height: 1.5rem;
    /* width: 4rem; */
    /* margin: 0%; */
    margin-bottom: 3%;
    margin-inline: 3%;
    font-family: "Chicle";
    font-size: 1rem;

    background-color: #ffcc00;
    border: solid 3px;
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
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 2rem;
  }
  .modal__content {
    display: flex;
    flex-direction: column;
    align-self: center;
  }
`;
