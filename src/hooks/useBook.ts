import { fetchBook } from "../api/book.api";
import useFetch from "./useFetch";

const useBook = (id: number) => {
  const { data, isLoading, error } = useFetch(() => fetchBook({ id }), [id]);

  return { book: data, isLoading, error };
};

export default useBook;
