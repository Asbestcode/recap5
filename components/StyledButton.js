import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  background-color: lightsalmon;
  border: 1px solid rgba(0, 0, 0, 1);
  padding: 1rem;
  margin-top: 0.5rem;
  border-radius: 0.6rem;
  color: black;
  text-decoration: none;
  font-weight: bold;
  font-size: inherit;
  cursor: pointer;

  ${({ variant }) =>
    variant === "delete" &&
    css`
      background-color: black;
      color: white;
    `}
`;
