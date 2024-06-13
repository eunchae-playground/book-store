import { useQuery } from "@tanstack/react-query";
import { fetchLatestBookReviews } from "../../api/book.api";

const useFetchLatestBookReviews = () => {
  return useQuery({
    queryKey: ["latest-book-reviews"],
    queryFn: () => fetchLatestBookReviews(),
  });
};

export default useFetchLatestBookReviews;
