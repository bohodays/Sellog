import styled from "styled-components";
import NotFoundBackground from "./assets/imgs/retro/404NotFound.png";

export const SDiv = styled.div<any>`
  position: absolute;
  z-index: 1000;
  height: 100vh;
  width: 100vw;
  /* background-color: plum; */
  background: linear-gradient(268.16deg, #4eb775 0%, #f5ca8a 100%);
  /* background: url(${NotFoundBackground}) no-repeat center center fixed;
  background-size: "cover";
  width: "100%";
  height: "100%"; */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  top: 0;
  font-size: 32px;
  color: green;
  font-family: "Bangers";

  span {
    color: white;
    color: green;
    font-size: 5vw;
  }

  i {
    color: darkslateblue;
  }

  @media screen and (min-width: 1200px) {
    display: none;
  }
`;
