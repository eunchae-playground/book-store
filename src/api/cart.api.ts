import { AddCartRequest } from "../models/cart.model";
import apiClient from "./apiClient";

export const addCart = async (req: AddCartRequest) => {
  const response = await apiClient.post("/carts", req);

  return response.data;
};
