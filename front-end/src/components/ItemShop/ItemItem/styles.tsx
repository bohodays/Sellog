import styled from "styled-components";

export const SArticle = styled.article`
  /* height: 30vh; */
  width: calc(20% - 10px);
  height: fit-content;
  color: white;
  padding: 1%;
  margin: 0% 1%;
  border: 0.2rem solid rgba(137, 239, 245);
  border-radius: 2rem;
  max-width: 100%;
  max-height: 100%;
  box-shadow: 0 0 0.3rem rgba(137, 239, 245),
    inset 0 0 0.05rem rgba(137, 239, 245), 0 0 0.01rem var(--neon-border-color),
    inset 0 0 0.05rem var(--neon-border-color),
    0 0 0.3rem var(--neon-border-color),
    inset 0 0 0.3rem var(--neon-border-color);

  .item__img {
    /* height: 80%; */
    width: calc(100%);
    height: calc(24vh);
    /* width: 100%; */
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
    height: 30px;
  }

  .item__name {
    margin: 2% 5%;
    font-size: calc(0.9vw);
    font-weight: 600;
  }

  .buy__btn {
    background-color: #a6e9c8;
    padding: 3% 4%;
    border-radius: 10px;
    font-weight: 600;
  }
`;
