import styled from "styled-components";

export const SArticle = styled.article`
  height: fit-content;
  width: fit-content;
  color: white;
  padding: 2%;
  margin: 0% 3%;
  border: 0.2rem solid rgba(137, 239, 245);
  border-radius: 2rem;
  box-shadow: 0 0 0.3rem rgba(137, 239, 245),
    inset 0 0 0.05rem rgba(137, 239, 245), 0 0 0.01rem var(--neon-border-color),
    inset 0 0 0.05rem var(--neon-border-color),
    0 0 0.3rem var(--neon-border-color),
    inset 0 0 0.3rem var(--neon-border-color);

  img {
    border-radius: 10%;
  }
`;
