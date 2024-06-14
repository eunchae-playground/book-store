import { PaginationData } from "./pagination.model";

export interface Book {
  id: number;
  categoryId: number;
  title: string;
  bookFormat: string;
  isbn: string;
  summary: string;
  detail: string;
  author: string;
  totalPages: number;
  tableOfContents: string;
  price: number;
  pubDate: string;
  image: string;
  isLiked?: number;
  likeCount: number;
  categoryName: string;
}

export interface BooksRequest {
  queryParams?: {
    categoryId?: number;
    page?: number;
    size?: number;
    latest?: boolean;
  };
}

export interface BooksResponse {
  data: Book[];
  pagination: PaginationData;
}

export type BestSellerBooksResponse = Book[]

export interface BookRequest {
  id: number;
}

export type BookResponse = Book;

export interface ToggleBookLikeResponse {
  isLiked: boolean;
}

export interface BookReviewsRequest {
  id: number;
}

export interface BookReview {
  id: number;
  userName: string;
  content: string;
  createdAt: string;
  score: number;
}

export type BookReviewsResponse = BookReview[];

export type LatestBookReviewsResponse = BookReview[];

export interface CreateBookReviewRequest {
  routeParams: {
    bookId: number;
  };
  payload: {
    content: string;
    score: number;
  };
}

export interface BookCategory {
  id: number | null;
  name: string;
  isActive?: boolean;
}

export type BookCategoriesResponse = Array<{
  id: number;
  name: string;
}>;
