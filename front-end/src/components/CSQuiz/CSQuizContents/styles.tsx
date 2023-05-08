import styled from "styled-components";

export const SSection = styled.section<any>`
  @font-face {
    font-family: "GmarketSansMedium";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  font-family: "GmarketSansMedium";
  margin-top: 2rem;
  text-align: center;

  h3 {
    font-size: 2vw;
    padding: 0 3rem;
  }

  .select__wrapper {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item {
    position: relative;
    margin: 1rem 3rem;
    background-color: red;
    width: 16rem;
    height: 16rem;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
  }

  .select1 {
    background-color: #f4f39e;
    transform: rotate(5.4deg);
    color: ${(props) => (props.activeFontColor === 1 ? "#dc3545" : "#000000")};
  }

  .select2 {
    background-color: #fdd7db;
    transform: rotate(-3deg);
    color: ${(props) => (props.activeFontColor === 2 ? "#dc3545" : "#000000")};
  }

  .select3 {
    background-color: #b9eaf6;
    transform: rotate(2.82deg);
    color: ${(props) => (props.activeFontColor === 3 ? "#dc3545" : "#000000")};
  }

  .select4 {
    background-color: #a1ecee;
    transform: rotate(-3.3deg);
    color: ${(props) => (props.activeFontColor === 4 ? "#dc3545" : "#000000")};
  }

  .tape {
    width: 6rem;
    height: 2rem;
    background-color: #ebebeb;

    position: absolute;
    top: -1rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .submit {
    background-color: var(--color-white);
    color: #000000;
    width: 8vw;
    height: 3rem;
    border-radius: 8px;
    border: 3px solid var(--color-blue);
    padding: 0.5rem 0.8rem;
    font-size: 1.2vw;
    user-select: none;
    margin-top: 3rem;
    transition: all 300ms ease-in;
  }

  .submit:hover {
    background-color: #fdd897;
  }

  .quest {
    min-height: 120px;
  }
`;

export const SDiv = styled.div`
  @font-face {
    font-family: "GmarketSansMedium";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  font-family: "GmarketSansMedium";

  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  .submit {
    background-color: var(--color-white);
    color: #000000;
    width: 8vw;
    height: 3rem;
    border-radius: 8px;
    border: 3px solid var(--color-blue);
    padding: 0.5rem 0.8rem;
    font-size: 1.2vw;
    user-select: none;
    margin-top: 3rem;
    transition: all 300ms ease-in;
    font-family: "GmarketSansMedium";
  }

  .submit:hover {
    background-color: #fdd897;
  }

  .comment {
    margin: 0 4rem;
  }
`;
