import { ButtonHTMLAttributes, ReactElement } from "react";

import { StyledButton } from "./ButtonStyles";
import Loader from "../Loader/Loader";

interface Props extends ButtonHTMLAttributes<HTMLDivElement> {
  children: ReactElement | ReactElement[] | string;
  variant?: "primary" | "secondary";
  width?: number;
  height?: number;
  onClick?: any;
  marginTop?: number;
  marginBottom?: number;
  isLoading?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  width = 280,
  variant = "primary",
  marginTop = 0,
  marginBottom = 0,
  height = 45,
  isLoading = false,
  isActive = false,
  isDisabled = false,
  ...rest
}: Props) => {
  return (
    <StyledButton
      variant={variant}
      marginTop={marginTop}
      marginBottom={marginBottom}
      isLoading={isLoading}
      isActive={isActive}
      isDisabled={isDisabled}
      onClick={onClick}
      role="button"
      width={width}
      height={height}
      {...rest}
    >
      {isLoading ? <Loader /> : children}
    </StyledButton>
  );
};
