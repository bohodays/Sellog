import styled from "styled-components";

export const SSection = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;

  .button__wrapper {
    text-align: center;
    width: 46rem;
    /* height: 32rem; */
    background: #faf4e6;
    border: 3px solid #ffffff;
    box-shadow: #ffffff 0px 0px 7px 2px;
    border-radius: 12px;

    font-size: 1rem;
    /* color: #ff401e; */

    user-select: none;
    padding: 2rem 1rem;
  }

  .left-wrapper {
    display: flex;
    /* flex-direction: column; */
    justify-content: space-evenly;
    align-items: center;
  }

  .right-wapper {
    height: 340px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .canvas__wrapper {
    width: 300px;
    height: 300px;
    /* background-color: black; */
    border-radius: 12px;
  }

  .input__wrapper {
    width: 18rem;
    background-color: var(--color-white);
    border-radius: 16px;
    height: 2.5rem;
    margin-top: 1rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    width: 100%;
    border: none;
    outline: none;
    padding-left: 1rem;
  }

  .name {
    margin-top: 0;
  }

  .nav {
    margin: 0 1rem;
    color: white;
    font-size: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    padding: 0;
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
  }

  .button-submit {
    width: 100%;
    height: 2.5rem;
    margin-top: 1rem;
    border-radius: 16px;
    background: rgba(255, 240, 240, 0.3);
    border: 3px solid #ffffff;
    transition: all 300ms linear;
  }

  .button-submit:hover {
    background: rgba(255, 210, 210, 0.3);
    box-shadow: #ffffff 0px 0px 7px 2px;
  }

  .empty {
    border: 2px solid red;
  }

  .enabled {
    color: #adadad;
    opacity: 0.1;
    cursor: default;
  }
`;
