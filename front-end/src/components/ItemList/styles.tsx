import styled from "styled-components";

export const SSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .item__pagenation--wrapper {
    display: flex;
    color: white;
    border: 1px solid white;
    border-radius: 30px;

    /* width: fit-content; */
    align-items: center;
    justify-content: center;
    padding: 0.5% 3%;
  }

  .item__pagenation--wrapper button {
    font-size: 1.3rem;
    font-weight: 600;
    color: navy;
    border-radius: 50%;
    margin: 0% 10%;
    background-color: white;
    /* border: none; */
    padding: 5% 15%;
  }
`;

export const SDiv = styled.div`
  display: flex;
  height: 100%;
  width: auto;
  flex-wrap: wrap;
  /* overflow: hidden; */
  justify-content: center;
  margin-left: 5%;
  margin-top: 2%;
  /* margin-bottom: 3%; */
  /* padding: 3%; */
`;
