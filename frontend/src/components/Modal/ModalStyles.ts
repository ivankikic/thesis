import styled, { css } from "styled-components";

const buttonVariants = {
  primary: css`
    background-color: #002666;
    color: #fff;
    &:hover {
      background-color: #002644;
    }
  `,
  secondary: css`
    background-color: #6c757d;
    color: #fff;
    &:hover {
      background-color: #5a6268;
    }
  `,
  error: css`
    background-color: #dc3545;
    color: #fff;
    &:hover {
      background-color: #bd2130;
    }
  `,
};

export const ModalButton = styled.button<{
  variant: "primary" | "secondary" | "error";
}>`
  font-size: 0.8rem;
  padding: 10px 15px;
  line-height: 14px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ variant }) => buttonVariants[variant]}
`;

export const Input = styled.input`
  width: 230px;
  padding: 3px 6px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  margin: 5px 5px;

  &.missing {
    outline: none;
    border-color: #dc3545;
  }

  &.input-error {
    border-color: #dc3545;
    outline: none;
    border: 1px solid #dc3545;
  }
`;

export const ImportColumns = styled.div`
  display: flex;
  flex-wrap: wrap;
`;