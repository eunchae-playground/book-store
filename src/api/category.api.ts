import { Category } from "../models/category.model";
import { httpClient } from "./http";

export const fetchCategories = async () => {
  const response = await httpClient.get<Category[]>("/books/categories");
  return response.data;
};
