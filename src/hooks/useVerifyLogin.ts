import { useEffect } from "react";
import { authenticate } from "../api/auth.api";
import { useAuthStore } from "../store/authStore";

const useVerifyLogin = () => {
  const { storeLogin } = useAuthStore();

  useEffect(() => {
    (async () => {
      try {
        await authenticate();
        storeLogin();
      } catch (error) {}
    })();
  }, [storeLogin]);
};

export default useVerifyLogin;
