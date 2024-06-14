import { useQuery } from "@tanstack/react-query";
import { fetchCarts } from "../../api/cart.api";

const useFetchCarts = () => {
  return useQuery({
    queryKey: ["carts"],
    queryFn: () => fetchCarts(),
  });
};

export default useFetchCarts;
