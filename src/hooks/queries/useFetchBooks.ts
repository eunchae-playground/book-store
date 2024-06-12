import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchBooks } from "../../api/book.api";

const useFetchBooks = (categoryId?: number, latest?: boolean) => {
  return useInfiniteQuery({
    queryKey: ["books"],
    queryFn: ({ pageParam }) =>
      fetchBooks({ queryParams: { categoryId, latest, page: pageParam } }),
    initialPageParam: 1,
    getNextPageParam: ({ pagination: { page, totalPages } }) =>
      page < totalPages ? page + 1 : null,
  });
};

export default useFetchBooks;
