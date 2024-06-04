import { ButtonHTMLAttributes, ReactNode } from "react";
import { styled } from "styled-components";
import { ButtonScheme, ButtonSize } from "../../style/theme";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size: ButtonSize;
  scheme: ButtonScheme;
  isLoading?: boolean;
}

function Button({
  children,
  size,
  scheme,
  disabled,
  isLoading,
  ...props
}: Props) {
  return (
    <ButtonStyle
      {...props}
      $size={size}
      $scheme={scheme}
      $disabled={disabled}
      $isLoading={isLoading}
    >
      {children}
    </ButtonStyle>
  );
}

interface ButtonStyleProps {
  $size: ButtonSize;
  $scheme: ButtonScheme;
  $disabled: boolean | undefined;
  $isLoading?: boolean;
}

const ButtonStyle = styled.button<ButtonStyleProps>`
  font-size: ${({ theme, $size }) => theme.button[$size].fontSize};
  padding: ${({ theme, $size }) => theme.button[$size].padding};
  color: ${({ theme, $scheme }) => theme.buttonScheme[$scheme].color};
  background-color: ${({ theme, $scheme }) =>
    theme.buttonScheme[$scheme].backgroundColor};
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
`;

export default Button;
