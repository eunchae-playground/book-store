import { fetchBooks } from "../api/book.api";
import useFetch from "./useFetch";

const useBooks = (categoryId?: number, latest?: boolean, page?: number) => {
  const { data, isLoading, error } = useFetch(
    () => fetchBooks({ queryParams: { categoryId, latest, page } }),
    [categoryId, latest, page]
  );

  const books = data ? data.data : null;
  const pagination = data ? data.pagination : null;
  const isEmpty = data ? data.pagination.totalElements === 0 : null;

  return { books, pagination, isEmpty, isLoading, error };
};

export default useBooks;
