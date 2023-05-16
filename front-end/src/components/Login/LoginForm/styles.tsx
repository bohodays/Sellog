import styled from "styled-components";

export const SSection = styled.section<any>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${(props) => (props.isVisible ? 100 : -1)};
  /* visibility: hidden; */
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: all var(--animation-duration) linear;

  .button__wrapper {
    text-align: center;
    width: 20rem;
    height: 16rem;
    background: rgba(255, 255, 255, 0.7);
    border: 3px solid #ffffff;
    box-shadow: #ffffff 0px 0px 7px 2px;
    border-radius: 12px;

    font-family: "S-CoreDream-7ExtraBold";
    font-size: 1rem;
    color: #ff401e;
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
  }

  button {
    display: block;
    width: 80%;
    text-align: center;
    margin: auto;
    margin-bottom: 1rem;
    color: var(--color-white);
    padding: 0.6rem 1rem;
    border-radius: 4px;
  }

  .github {
    position: relative;
    background-color: var(--color-dark-blue);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0px;
    margin-top: 2rem;
  }

  .tistory {
    position: relative;
    background-color: var(--color-dark-red);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon {
    position: absolute;
    left: 1rem;
    font-size: 1.2rem;
  }

  .icon__tistory {
    position: absolute;
    width: 1.2rem;
    height: 1.2rem;
    font-size: 48px;
    left: 1rem;
  }

  img {
    width: 5rem;
    text-align: center;
    margin: auto;
    margin-bottom: 0;
    margin-top: 0;
  }
`;
