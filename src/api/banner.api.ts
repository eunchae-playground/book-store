import { BannersResponse } from "../models/banner.model";
import apiClient from "./apiClient";

export const fetchBanners = async () => {
  const response = await apiClient.get<BannersResponse>('/banners');

  return response.data;
}