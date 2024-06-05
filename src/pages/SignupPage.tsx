import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { signup } from "../api/auth.api";
import Button from "../components/common/Button";
import InputText from "../components/common/InputText";
import Title from "../components/common/Title";
import useAlert from "../hooks/useAlert";
import { SignupRequest } from "../models/auth.model";

function SignupPage() {
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null
  );

  const navigate = useNavigate();
  const showAlert = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupRequest>();

  const onSubmit = async (data: SignupRequest) => {
    try {
      await signup(data);
      showAlert("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (error) {
      if (isAxiosError(error)) {
        setServerErrorMessage(error.response!.data.message);
      }
    }
  };
  return (
    <>
      <Title size="large">회원가입</Title>
      <SignupPageStyle>
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder="이메일"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="error-text">이메일을 입력해주세요.</p>
            )}
          </fieldset>
          <fieldset>
            <InputText
              placeholder="비밀번호"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="error-text">비밀번호를 입력해주세요.</p>
            )}
          </fieldset>
          <fieldset>
            {serverErrorMessage && (
              <p className="error-text">{serverErrorMessage}</p>
            )}
            <Button type="submit" size="medium" scheme="primary">
              회원가입
            </Button>
          </fieldset>
          <div className="info">
            <Link to="/login">로그인</Link>
          </div>
        </form>
      </SignupPageStyle>
    </>
  );
}

export const SignupPageStyle = styled.div`
  max-width: ${({ theme }) => theme.layout.width.small};
  margin: 80px auto;

  fieldset {
    border: 0;
    padding: 0 0 8px 8;
    .error-text {
      color: red;
    }
  }

  input {
    width: 100%;
  }

  button {
    width: 100%;
  }

  .info {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 16px;
  }
`;

export default SignupPage;
