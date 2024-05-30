import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { theme } from "../../assets/theme";

interface StyledProps {
  variant: "primary" | "secondary";
  width?: number;
  height?: number;
  marginTop: number;
  marginBottom: number;
  isLoading: boolean;
  isActive: boolean;
  isDisabled: boolean;
}

export const ButtonBase = styled.div`
  cursor: pointer;
  padding: 18px 0;
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
`;

export const StyledButton = styled(ButtonBase)<StyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  color: ${theme.colors.white};
  width: ${({ width }) => (width ? `${width}px` : "auto")};
  margin-top: ${({ marginTop }) => marginTop}px;
  margin-bottom: ${({ marginBottom }) => marginBottom}px;
  height: ${({ height }) => (height ? `${height}px` : "45px")};
  font-size: 16px;
  white-space: nowrap; /* Prevent text wrapping */
  ${({ variant, isActive }) => {
    if (variant === "primary") {
      return css`
        background-color: ${theme.colors.secondary};
        box-shadow: 4px 4px 20px rgba(93, 124, 138, 0.2);
      `;
    }
    if (variant === "secondary") {
      if (isActive) {
        return css`
          color: ${theme.colors.white};
          background-color: ${theme.colors.darkSecondary};
          box-shadow: 4px 4px 20px rgba(93, 124, 138, 0.2);
        `;
      }
      return css`
        background-color: ${theme.colors.secondary};
        box-shadow: 4px 4px 20px rgba(93, 124, 138, 0.2);
      `;
    }
  }}

  ${({ isLoading }) =>
    isLoading &&
    css`
      background-color: transparent;
      box-shadow: none;
    `}

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      pointer-events: none;
      box-shadow: none;
      opacity: 0.25;
    `}
    @media (max-width: 767px) {
    font-size: 16px;
  }
  @media (max-width: 767px) {
    width: ${({ width }) => (width ? `${width}px` : "auto")};
    height: 40px;
    font-size: 14px;
  }
`;
