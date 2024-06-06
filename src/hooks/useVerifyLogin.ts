import { useEffect } from "react";
import { authenticate } from "../api/auth.api";
import { useAuthStore } from "../store/authStore";

const useVerifyLogin = () => {
  const { storeLogin, setAuthFinished } = useAuthStore();

  useEffect(() => {
    (async () => {
      try {
        const { isLogin } = await authenticate();
        setAuthFinished(); // 인증 절차 끝남 상태로 변경
        if (isLogin) {
          storeLogin();
        }
      } catch (error) {}
    })();
  }, [setAuthFinished, storeLogin]);
};

export default useVerifyLogin;
