import { setupWorker } from "msw/browser";
import { createReview, reviewsById } from "./review";

const handlers = [reviewsById, createReview];

export const worker = setupWorker(...handlers);
