import { useQuery } from "@tanstack/react-query";
import { fetchBookCategories } from "../../api/book.api";

const useFetchBookCategories = () => {
  return useQuery({
    queryKey: ["book-categories"],
    queryFn: () => fetchBookCategories(),
  });
};

export default useFetchBookCategories;
