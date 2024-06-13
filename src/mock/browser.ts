import { setupWorker } from "msw/browser";
import { banners } from "./banner";
import { bestSellerBooks } from "./book";
import { createReview, latestBookReviews, reviewsById } from "./review";

const handlers = [
  reviewsById,
  latestBookReviews,
  createReview,
  banners,
  bestSellerBooks,
];

export const worker = setupWorker(...handlers);
