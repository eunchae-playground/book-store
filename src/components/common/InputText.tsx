import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";
import { styled } from "styled-components";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

const InputText = forwardRef(
  ({ placeholder, ...props }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <InputTextStyle
        ref={ref}
        placeholder={placeholder}
        type={props.type || "text"}
        {...props}
      ></InputTextStyle>
    );
  }
);

const InputTextStyle = styled.input`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.text};
`;

export default InputText;
