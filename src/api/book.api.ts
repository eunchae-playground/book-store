import {
  BooksRequest,
  BooksResponse,
  ToggleBookLikeResponse,
} from "../models/book.model";
import { httpClient } from "./http";

export const fetchBooks = async (req?: BooksRequest) => {
  const response = await httpClient.get<BooksResponse>("/books", {
    params: req?.queryParams,
  });

  return response.data;
};

export const toggleBookLike = async ({ id }: { id: number }) => {
  const response = await httpClient.post<ToggleBookLikeResponse>(
    `/books/${id}/likes`,
    { id }
  );

  return response.data;
};
