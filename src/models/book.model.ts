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

export interface ToggleBookLikeResponse {
  isLiked: boolean;
}
