import { Book } from "../models/book.model";
import { PaginationData } from "../models/pagination.model";
import { httpClient } from "./http";

export interface BooksRequest {
  queryParams?: {
    categoryId?: number;
    page?: number;
    size?: number;
    latest?: boolean;
  };
}

 interface BooksResponse {
  data: Book[];
  pagination: PaginationData;
}

export const fetchBooks = async (data?: BooksRequest) => {
  const response = await httpClient.get<BooksResponse>("/books", {
    params: data?.queryParams,
  });

  return response.data;
};

interface ToggleBookLikeResponse {
  isLiked: boolean;
}

export const toggleBookLike = async ({ id }: { id: number }) => {
  const response = await httpClient.post<ToggleBookLikeResponse>(
    `/books/${id}/likes`,
    { id }
  );

  return response.data;
};
