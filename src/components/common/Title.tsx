import { HTMLAttributes, ReactNode } from "react";
import { styled } from "styled-components";
import { ColorKey, HeadingSize } from "../../style/theme";

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  size: HeadingSize;
  color?: ColorKey;
}

function Title({ children, size, color, ...props }: Props) {
  return (
    <TitleStyle {...props} size={size} color={color}>
      {children}
    </TitleStyle>
  );
}

const TitleStyle = styled.h1<Omit<Props, "children">>`
  font-size: ${({ theme, size }) => theme.heading[size].fontSize};
  color: ${({ theme, color }) => theme.color[color || "primary"]};
`;

export default Title;
