import { AddCartRequest } from "../models/cart.model";
import axiosInstance from "./axios/axiosInstance";

export const addCart = async (req: AddCartRequest) => {
  const response = await axiosInstance.post("/carts", req);

  return response.data;
}