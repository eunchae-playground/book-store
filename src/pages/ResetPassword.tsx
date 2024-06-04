import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword, resetPasswordRequest } from "../api/auth.api";
import Button from "../components/common/Button";
import InputText from "../components/common/InputText";
import Title from "../components/common/Title";
import useAlert from "../hooks/useAlert";
import { SignupStyle } from "./Signup";

export interface ResetPasswordProps {
  email: string;
  password: string;
  confirmPassword: string;
}

function ResetPassword() {
  const navigate = useNavigate();
  const showAlert = useAlert();
  const [isResetRequestCompleted, setIsResetRequestCompleted] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordProps>();

  const onSubmit = (data: ResetPasswordProps) => {
    const { email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setError("confirmPassword", {
        type: "validate",
        message: "비밀번호가 일치하지 않습니다.",
      });
      return;
    }

    if (!isResetRequestCompleted) {
      resetPasswordRequest({ email }).then(() => {
        setIsResetRequestCompleted(true);
      });
      return;
    }

    resetPassword({ password, confirmPassword }).then(() => {
      showAlert("비밀번호가 초기화되었습니다.");
      navigate("/login");
    });
  };
  return (
    <>
      <Title size="large">비밀번호 초기화</Title>
      <SignupStyle>
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
          {!isResetRequestCompleted && (
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
          )}

          {isResetRequestCompleted && (
            <>
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
                <InputText
                  placeholder="비밀번호 확인"
                  type="password"
                  {...register("confirmPassword", {
                    required: {
                      message: "확인 비밀번호를 입력해주세요.",
                      value: true,
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <p className="error-text">{errors.confirmPassword.message}</p>
                )}
              </fieldset>
            </>
          )}

          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              {isResetRequestCompleted ? "비밀번호 초기화" : "초기화 요청"}
            </Button>
          </fieldset>
          <div className="info">
            <Link to="/login">로그인</Link>
          </div>
        </form>
      </SignupStyle>
    </>
  );
}

export default ResetPassword;
