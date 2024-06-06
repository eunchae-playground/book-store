import { CategoriesResponse } from "../models/category.model";
import apiClient from "./apiClient";

export const fetchCategories = async () => {
  const response = await apiClient.get<CategoriesResponse>("/books/categories");

  return response.data;
};
