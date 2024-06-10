import { CreateOrderRequest } from "../models/order.model";
import apiClient from "./apiClient";

export const createOrder = async (req: CreateOrderRequest) => {
  const response = await apiClient.post("/orders", req);

  return response.data;
};
