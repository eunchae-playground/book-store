import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../../api/order.api";

const useFetchOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => fetchOrders(),
  });
};

export default useFetchOrders ;