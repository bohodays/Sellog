import styled from "styled-components";

export const SSection = styled.section<any>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;

  position: relative;

  .item__pagenation--wrapper {
    display: ${(props) => (props.isEmpty ? "flex" : "none")};
    background-color: white;
    border: 1px solid white;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
    padding: 0.3% 1.5%;
    position: fixed;
    bottom: 3vh;
  }

  .page__btn {
    font-size: 1.2vw;
    font-weight: 600;
    color: navy;
    border-radius: 50%;
    margin: 0% 0.5%;
    background-color: white;
    padding: 5px 10px;
  }

  .page__btn--active {
    font-size: 1.2vw;
    font-weight: 600;
    color: white;
    border-radius: 50%;
    margin: 0% 0.5%;
    background-color: navy;
    padding: 5px 10px;
  }
`;

export const SDiv = styled.div`
  display: flex;
  /* height: 100%; */
  width: 80vw;
  flex-wrap: wrap;
  justify-content: flex-start;
  /* justify-content: space-evenly; */
  margin-top: -3.5vh;
  margin-left: 4vw;
`;
