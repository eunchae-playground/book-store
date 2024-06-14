import { http, HttpResponse } from "msw";
import { BannersResponse } from "../../models/banner.model";

const mockBanners: BannersResponse = [
  { imageUrl: "https://picsum.photos/id/10/1920/1080" },
  { imageUrl: "https://picsum.photos/id/11/1920/1080" },
  { imageUrl: "https://picsum.photos/id/12/1920/1080" },
];

const banners = http.get("http://localhost:3000/banners", () => {
  return HttpResponse.json(mockBanners, { status: 200 });
});

const bannerHandlers = [banners];

export default bannerHandlers;
