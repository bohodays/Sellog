import styled from "styled-components";

export const SSection = styled.section<any>`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 100%;
  height: 100%;
  /* margin: 3%; */
  margin-left: 10%;
  position: relative;

  .item__pagenation--wrapper {
    display: ${(props) => (props.isEmpty ? "flex" : "none")};
    background-color: white;
    border: 1px solid white;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
    padding: 0.5% 3%;
    position: absolute;
    bottom: -30%;
    left: 40%;
  }

  .page__btn {
    font-size: 1.3rem;
    font-weight: 600;
    color: navy;
    border-radius: 50%;
    margin: 0% 10%;
    background-color: white;
    /* border: none; */
    padding: 5px 10px;
  }

  .page__btn--active {
    font-size: 1.3rem;
    font-weight: 600;
    color: white;
    border-radius: 50%;
    margin: 0% 10%;
    background-color: navy;
    /* border: none; */
    padding: 5px 10px;
  }
`;

export const SDiv = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-wrap: wrap;
  margin-top: -3%;
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
