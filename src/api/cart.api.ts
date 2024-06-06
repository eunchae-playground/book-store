import {
  AddCartRequest,
  CartsResponse,
  DeleteCartRequest,
} from "../models/cart.model";
import apiClient from "./apiClient";

export const fetchCarts = async () => {
  const response = await apiClient.get<CartsResponse>("/carts");

  return response.data;
};

export const addCart = async (req: AddCartRequest) => {
  const response = await apiClient.post("/carts", req);

  return response.data;
};

export const deleteCart = async ({ id }: DeleteCartRequest) => {
  const response = await apiClient.delete(`/carts/${id}`);

  return response.data;
};
