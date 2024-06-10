import { fetchOrders } from "../api/order.api";
import useFetch from "./useFetch";

const useOrders = () => {
  const { data: orders, isLoading, error } = useFetch(fetchOrders, []);

  const isEmpty = orders ? orders.length === 0 : null;

  return { orders, isEmpty, isLoading, error };
};

export default useOrders;
