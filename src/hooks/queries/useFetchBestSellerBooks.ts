import { useQuery } from "@tanstack/react-query";
import { fetchBestSellerBooks } from "../../api/book.api";

const useFetchBestSellerBooks = () => {
  return useQuery({
    queryKey: ["best-seller-books"],
    queryFn: () => fetchBestSellerBooks(),
  });
};

export default useFetchBestSellerBooks;
