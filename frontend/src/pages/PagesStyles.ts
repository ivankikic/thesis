import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 50px;
`;

export const PageTitle = styled.h1`
  font-size: 2rem;
`;

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

export const CustomButton = styled.button<{
  variant: "primary" | "secondary" | "error";
}>`
  border: none;
  padding: 10px 15px;
  border-radius: 12px;
  line-height: 14px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ variant }) => buttonVariants[variant]}
`;
