import { useEffect, useState } from "react";
import { fetchBooks } from "../api/book.api";
import { Book } from "../models/book.model";
import { PaginationData } from "../models/pagination.model";

const useBooks = (categoryId?: number, latest?: boolean, page?: number) => {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [pagination, setPagination] = useState<PaginationData>();
  const [isEmpty, setIsEmpty] = useState<boolean | null>(null);

  useEffect(
    function useBooksCallback() {
      fetchBooks({ queryParams: { categoryId, latest, page } }).then(
        ({ data, pagination }) => {
          setBooks(data);
          setPagination(pagination);
          setIsEmpty(pagination.totalElements === 0);
        }
      );
    },
    [categoryId, latest, page]
  );

  return { books, pagination, isEmpty };
};

export default useBooks;
