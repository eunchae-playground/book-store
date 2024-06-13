import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchBooks } from "../../api/book.api";

interface ParameterType {
  categoryId?: number;
  latest?: boolean;
}

const useFetchBooks = (params?: ParameterType) => {
  const { categoryId, latest } = params || {};

  return useInfiniteQuery({
    queryKey: ["books", categoryId, latest],
    queryFn: ({ pageParam }) =>
      fetchBooks({ queryParams: { categoryId, latest, page: pageParam } }),
    initialPageParam: 1,
    getNextPageParam: ({ pagination: { page, totalPages } }) =>
      page < totalPages ? page + 1 : null,
  });
};

export default useFetchBooks;
