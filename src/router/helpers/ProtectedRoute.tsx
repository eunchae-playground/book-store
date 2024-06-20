import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

interface Props {
  children: ReactElement;
  role: "anonymousUser" | "loginUser";
  redirectTo?: string;
}

function ProtectedRoute({ children, role, redirectTo = "/login" }: Props) {
  const { isLogin, isAuthFinished } = useAuthStore();
  const NavigatedRoute = <Navigate to={redirectTo} replace />;

  // 인증절차가 끝나기 전에 Route를 보여주는 것을 방지
  if (!isAuthFinished) return <></>;

  if (role === "anonymousUser" && isLogin) {
    return NavigatedRoute;
  }
  if (role === "loginUser" && !isLogin) {
    return NavigatedRoute;
  }

  return children;
}

export default ProtectedRoute;
