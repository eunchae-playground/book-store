import { useQuery } from "@tanstack/react-query";
import { fetchBook } from "../../api/book.api";
import { BookRequest } from "../../models/book.model";

const useFetchBook = ({ id }: BookRequest) => {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBook({ id }),
  });
};

export default useFetchBook;
