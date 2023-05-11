import styled from "styled-components";

export const SSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 40vh;
  position: relative;

  .prev__page {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .next__page {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const SDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0vw -2vw;
  /* margin-top: 1vw; */
`;
