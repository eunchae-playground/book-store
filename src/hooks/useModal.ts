import { useCallback } from "react";

const useModal = () => {
  const showToast = useCallback((message: string) => {
    alert(message);
  }, []);

  const showAlert = useCallback((message: string) => {
    alert(message);
  }, []);

  const showConfirm = useCallback((message: string) => {
    return window.confirm(message);
  }, []);

  return { showToast, showAlert, showConfirm };
};

export default useModal;
