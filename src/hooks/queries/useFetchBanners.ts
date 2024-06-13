import { useQuery } from "@tanstack/react-query";
import { fetchBanners } from "../../api/banner.api";

const useFetchBanners = () => {
  return useQuery({
    queryKey: ['banners'],
    queryFn: () => fetchBanners()
  })
}

export default useFetchBanners;