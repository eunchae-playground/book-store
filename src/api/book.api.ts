import {
  BookRequest,
  BookResponse,
  BooksRequest,
  BooksResponse,
  ToggleBookLikeResponse,
} from "../models/book.model";
import axiosInstance from "./axios/axiosInstance";

export const fetchBooks = async (req?: BooksRequest) => {
  const response = await axiosInstance.get<BooksResponse>("/books", {
    params: req?.queryParams,
  });

  return response.data;
};

export const toggleBookLike = async ({ id }: { id: number }) => {
  const response = await axiosInstance.post<ToggleBookLikeResponse>(
    `/books/${id}/likes`,
    { id }
  );

  return response.data;
};

export const fetchBook = async ({ id }: BookRequest) => {
  const response = await axiosInstance.get<BookResponse>(`/books/${id}`);

  return response.data;
};
