import {
  BookRequest,
  BookResponse,
  BookReviewsRequest,
  BookReviewsResponse,
  BooksRequest,
  BooksResponse,
  CreateBookReviewRequest,
  ToggleBookLikeResponse,
} from "../models/book.model";
import apiClient from "./apiClient";

export const fetchBooks = async (req?: BooksRequest) => {
  const response = await apiClient.get<BooksResponse>("/books", {
    params: req?.queryParams,
  });

  return response.data;
};

export const toggleBookLike = async ({ id }: { id: number }) => {
  const response = await apiClient.post<ToggleBookLikeResponse>(
    `/books/${id}/likes`,
    { id }
  );

  return response.data;
};

export const fetchBook = async ({ id }: BookRequest) => {
  const response = await apiClient.get<BookResponse>(`/books/${id}`);

  return response.data;
};

export const fetchBookReviews = async ({ id }: BookReviewsRequest) => {
  const response = await apiClient.get<BookReviewsResponse>(
    `/books/${id}/reviews`
  );

  return response.data;
};
export const createBookReview = async ({
  routeParams,
  payload,
}: CreateBookReviewRequest) => {
  const response = await apiClient.post(
    `/books/${routeParams.bookId}/reviews`,
    payload
  );

  return response.data;
};
