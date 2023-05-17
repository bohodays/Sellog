import styled from "styled-components";

export const SArticle = styled.article`
  width: 90%;
  /* height: 24%; */
  margin-bottom: 3%;
  /* padding-bottom: 1%; */
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    color: black;
    margin: 2%;
  }

  .feed__card {
    width: 95%;
    height: 15vh;

    /* margin-block: 3%; */
    /* padding-inline: 3%;
    padding-block: 1%;
    padding-bottom: 2%; */
    padding: 1.5rem 2rem;

    display: flex;
    flex-direction: column;
    justify-content: space-around;

    background-color: white;
    border-radius: 16px;
    box-shadow: 2px 2px 1px 1px grey;

    font-size: large;
    font-weight: 600;
  }
  .feed__card-info {
    display: flex;
    justify-content: space-between;
    align-items: end;
  }
  .feed__card-source {
    text-align: left;
    font-size: 0.8rem;
    font-weight: 400;
  }
  .feed__card-detail {
    display: flex;
    justify-content: end;
    align-items: end;
    width: 50%;
    font-size: small;
    font-weight: 400;
    font-size: 1vw;
    p {
      padding-inline: 2%;
    }
  }

  .container {
    width: 100%;
    /* height: 500px; */
  }
`;
