import { useEffect } from "react";
import { authenticate } from "../api/auth.api";
import { useAuthStore } from "../store/authStore";

const useVerifyLogin = () => {
  const { storeLogin } = useAuthStore();

  useEffect(
    function verifyLogin() {
      authenticate()
        .then(() => {
          storeLogin();
        })
        .catch(() => {});
    },
    [storeLogin]
  );
};

export default useVerifyLogin;
