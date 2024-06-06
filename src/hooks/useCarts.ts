import { fetchCarts } from "../api/cart.api";
import useFetch from "./useFetch";

const useCarts = () => {
  const { data: carts, isLoading, error, refetch } = useFetch(fetchCarts, []);

  const isEmpty = carts ? carts.length === 0 : null;

  return { carts, isEmpty, isLoading, error, refetch };
};

export default useCarts;
