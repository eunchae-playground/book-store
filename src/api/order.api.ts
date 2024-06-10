import { CreateOrderRequest, OrdersResponse } from "../models/order.model";
import apiClient from "./apiClient";

export const fetchOrders = async () => {
  const response = await apiClient.get<OrdersResponse>("/orders");

  return response.data;
};

export const createOrder = async (req: CreateOrderRequest) => {
  const response = await apiClient.post("/orders", req);

  return response.data;
};
