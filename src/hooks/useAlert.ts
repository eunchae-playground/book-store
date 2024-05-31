import { useCallback } from "react";

const useAlert = () => {
  const showAlert = useCallback((message: string) => {
    alert(message);
  }, []);

  return showAlert;
};

export default useAlert;
