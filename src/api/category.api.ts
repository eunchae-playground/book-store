import { CategoriesResponse } from "../models/category.model";
import axiosInstance from "./axios/axiosInstance";

export const fetchCategories = async () => {
  const response = await axiosInstance.get<CategoriesResponse>(
    "/books/categories"
  );
  return response.data;
};
