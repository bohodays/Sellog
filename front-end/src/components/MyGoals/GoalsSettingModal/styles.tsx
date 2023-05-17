import styled from "styled-components";

export const SSection = styled.section<any>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  z-index: 4;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  font-family: "GmarketSansMedium";

  .recommended__goal__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5%;
  }

  .custom__goal__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 21vw;
  }

  .memo__png {
    position: absolute;
    bottom: 8%;
    left: 5%;
    height: 8vh;
  }

  .update__btn {
    position: absolute;
    bottom: 10%;
    right: 5%;
    padding: 5px 10px;
    background-color: #e8dda1;
    border: 2px solid #083d4f;
    border-radius: 20px;
    font-weight: 900;
    font-family: "GmarketSansMedium";
  }

  .update__btn:hover {
    background-color: #dbc33b;
  }

  .set__goal {
    width: 12vw;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1vh 1vw;
    border: 2px solid #083d4f;
    border-radius: 30px;
    background-color: #e8dda1;
    font-weight: 600;
    font-family: "ZCOOL KuaiLe", serif;
    font-family: "GmarketSansMedium";
  }

  .OX_btn {
    width: 100%;
  }
`;

export const SDiv = styled.div`
  position: fixed;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* width: 30%; */
  /* height: 45%; */
  border: 2px solid #083d4f;
  padding: 0.5vw;
  background-color: #e8dda1;
  border-radius: 20px;

  .modal {
    border: 2px solid #083d4f;
    border-radius: 3px;
    background-color: #81a9a8;
    height: 100%;
    width: 100%;
    padding: 5vw;
    p {
      font-size: 1rem;
      color: #bd0000;
    }
  }
`;
