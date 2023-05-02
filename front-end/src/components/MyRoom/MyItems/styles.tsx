import styled from "styled-components";

export const SSection = styled.section`
  height: 100%;
  width: 40%;
  background-color: #e4d1b0;
  transform: translateX(-100%);
  animation: slide-in 1s ease-out forwards;
  padding: 0.8vw;

  @keyframes slide-in {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
  .title__wrapper {
    display: flex;
  }

  .title {
    font-family: "Chicle";
    color: #cb4f4f;
    font-weight: 500;
    text-shadow: 0px 8px 6px rgba(0, 0, 0, 0.25);
    transform: rotate(-1deg);
    font-size: 3vw;
    margin-left: 1vw;
    margin-top: 0.5vw;
  }
`;
