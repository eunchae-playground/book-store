import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth.api";
import Button from "../components/common/Button";
import InputText from "../components/common/InputText";
import Title from "../components/common/Title";
import useAlert from "../hooks/useAlert";
import { useAuthStore } from "../store/authStore";
import { SignupStyle } from "./Signup";

export interface LoginProps {
  email: string;
  password: string;
}

function Login() {
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null
  );

  const navigate = useNavigate();
  const showAlert = useAlert();

  const { storeLogin } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit = async (data: LoginProps) => {
    try {
      await login(data);
      storeLogin();
      showAlert("로그인이 완료되었습니다.");
      navigate("/");
    } catch (error) {
      if (isAxiosError(error)) {
        setServerErrorMessage(error.response!.data.message);
      }
    }
  };
  
  return (
    <>
      <Title size="large">로그인</Title>
      <SignupStyle>
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
              로그인
            </Button>
          </fieldset>
          <div className="info">
            <Link to="/signup">회원가입</Link>
            <Link to="/reset-password">비밀번호 초기화</Link>
          </div>
        </form>
      </SignupStyle>
    </>
  );
}

export default Login;
