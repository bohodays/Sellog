import styled from "styled-components";

export const SSection = styled.section<any>`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 100vw;
  /* height: 100%; */
  /* margin: 3%; */
  /* margin-left: 2vw; */
  position: relative;

  .item__pagenation--wrapper {
    display: ${(props) => (props.isEmpty ? "flex" : "none")};
    background-color: white;
    border: 1px solid white;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
    padding: 0.5% 3%;
    /* width: fit-content; */
    position: fixed;
    bottom: 2.5vh;
    /* left: 40%; */
  }

  .page__btn {
    font-size: 1.3vw;
    font-weight: 600;
    color: navy;
    border-radius: 50%;
    margin: 0% 1%;
    background-color: white;
    /* border: none; */
    padding: 5px 10px;
  }

  .page__btn--active {
    font-size: 1.3vw;
    font-weight: 600;
    color: white;
    border-radius: 50%;
    margin: 0% 1%;
    background-color: navy;
    /* border: none; */
    padding: 5px 10px;
  }
`;

export const SDiv = styled.div`
  display: flex;
  /* height: 100%; */
  width: 82vw;
  flex-wrap: wrap;
  justify-content: flex-start;
  /* justify-content: space-evenly; */
  margin-top: -3vh;
  margin-left: 2.5vw;
  /* margin: 0vw 5vw; */

  /* margin-top: -3%; */
  /* overflow: hidden; */
  /* justify-content: center; */
  /* display: grid; */
  /* grid-template-columns: repeat(4, 1fr); */
  /* gap: 20px; */
  /* margin-left: 5%; */
  /* margin-top: 2%; */
  /* margin-bottom: 3%; */
  /* padding: 3%; */
`;
