import { CategoriesResponse } from "../models/category.model";
import { httpClient } from "./http";

export const fetchCategories = async () => {
  const response = await httpClient.get<CategoriesResponse>(
    "/books/categories"
  );
  return response.data;
};
