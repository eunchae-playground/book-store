import { useQuery } from "@tanstack/react-query";
import { fetchBookReviews } from "../../api/book.api";
import { BookReviewsRequest } from "../../models/book.model";

const useFetchBookReviews = ({ id }: BookReviewsRequest) => {
  return useQuery({
    queryKey: ["book-reviews", id],
    queryFn: () => fetchBookReviews({ id }),
  });
};

export default useFetchBookReviews;
