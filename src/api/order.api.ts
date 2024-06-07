import { OrderRequest } from "../models/order.model";
import apiClient from "./apiClient";

export const createOrders = async (req: OrderRequest) => {
  const response = await apiClient.post("/orders", req);

  return response.data;
};
