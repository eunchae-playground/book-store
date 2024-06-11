import { fetchBookReviews } from "../api/book.api";
import useFetch from "./useFetch";

const useBookReviews = (id: number) => {
  const { data, isLoading, error } = useFetch(
    () => fetchBookReviews({ id }),
    [id]
  );

  const isEmpty = data ? data.length === 0 : null;

  return { reviews: data, isLoading, isEmpty, error };
};

export default useBookReviews;
