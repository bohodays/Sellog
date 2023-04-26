import styled from "styled-components";

export const SSection = styled.section<any>`
  display: flex;
  flex-direction: column;
<<<<<<< HEAD
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
=======
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
>>>>>>> 88532fa (design : 상점 페이지 item pagenation ing)
    font-size: 1.3rem;
    font-weight: 600;
    color: navy;
    border-radius: 50%;
    margin: 0% 10%;
    background-color: white;
    /* border: none; */
<<<<<<< HEAD
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
=======
    padding: 5% 15%;
>>>>>>> 88532fa (design : 상점 페이지 item pagenation ing)
  }
`;

export const SDiv = styled.div`
  display: flex;
  height: 100%;
<<<<<<< HEAD
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
=======
  width: auto;
  flex-wrap: wrap;
  /* overflow: hidden; */
  justify-content: center;
  margin-left: 5%;
  margin-top: 2%;
>>>>>>> 88532fa (design : 상점 페이지 item pagenation ing)
  /* margin-bottom: 3%; */
  /* padding: 3%; */
`;
