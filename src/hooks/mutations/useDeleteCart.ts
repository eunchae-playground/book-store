import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { deleteCart } from "../../api/cart.api";
import { DeleteCartRequest } from "../../models/cart.model";
import useModal from "../useModal";

const useDeleteCart = ({ id }: DeleteCartRequest) => {
  const queryClient = useQueryClient();
  const { showToast, showAlert } = useModal();

  return useMutation({
    mutationFn: () => deleteCart({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      showToast("장바구니에서 삭제되었습니다.");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        showAlert(error.response?.data.message || error.message);
      }
    },
  });
};

export default useDeleteCart;
