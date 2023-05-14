import styled from "styled-components";

export const SArticle = styled.article`
  /* height: 30vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(20% - 10px);
  height: 38vh;
  color: white;
  padding: 1%;
  margin: 0vw 2vw;
  border: 0.2rem solid rgba(137, 239, 245);
  border-radius: 2rem;
  margin-bottom: 1vh;
  box-shadow: 0 0 0.3rem rgba(137, 239, 245),
    inset 0 0 0.05rem rgba(137, 239, 245), 0 0 0.01rem var(--neon-border-color),
    inset 0 0 0.05rem var(--neon-border-color),
    0 0 0.3rem var(--neon-border-color),
    inset 0 0 0.3rem var(--neon-border-color);

  .item__img {
    width: calc(100%);
    height: calc(25vh);
  }

  .item__description__wrapper {
    display: flex;
    flex-direction: column;
    margin: 1%;
  }

  .item__description {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .coin__wrapper {
    display: flex;
    align-items: center;
  }

  .coin {
    height: 3.5vh;
  }

  .item__name {
    margin: 1vh;
    font-size: 1vw;
    font-weight: 600;
  }

  .buy__btn {
    background-color: #a6e9c8;
    padding: 3% 4%;
    border-radius: 10px;
    font-weight: 600;
  }

  .buy__btn:hover {
    box-shadow: 0 0 0.25rem rgba(137, 239, 245, 1),
      inset 0 0 0.25rem rgba(137, 239, 245, 1),
      0 0 0.01rem var(--neon-border-color),
      inset 0 0 0.01rem var(--neon-border-color),
      0 0 0.5rem var(--neon-border-color),
      inset 0 0 0.5rem var(--neon-border-color);
  }
`;
