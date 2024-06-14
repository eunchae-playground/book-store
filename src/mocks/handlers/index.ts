import { HttpHandler } from "msw";
import bannerHandlers from "./banner.handler";
import bookHandlers from "./book.handler";
import reviewHandlers from "./review.handler";

const handlers: HttpHandler[] = [
  ...bannerHandlers,
  ...bookHandlers,
  ...reviewHandlers,
];

export default handlers;
