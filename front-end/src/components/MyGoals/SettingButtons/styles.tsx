import styled from "styled-components";

export const SArticle = styled.article`
  padding-top: 8rem;
  padding-bottom: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;

  p {
    margin-bottom: 1rem;
  }

  button {
    width: 80%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 3px solid #76797a;
    margin-bottom: 1rem;
  }

  .item1 {
    font-family: "ZCOOL KuaiLe", sans-serif;
    font-size: 1.2rem;
  }

  .item2 {
    min-width: 8rem;
  }

  .purple {
    color: #9b59b6;
    font-weight: bold;
  }

  .red {
    color: #f1631b;
    font-weight: bold;
  }

  .yellow {
    color: #e1b34b;
    font-weight: bold;
  }

  .blue {
    color: #5488a1;
    font-weight: bold;
  }

  .green {
    color: #6eb78d;
    font-weight: bold;
  }
`;
