import { setupWorker } from "msw/browser";
import handlers from "./handlers";

const worker = setupWorker(...handlers);

export const enableMocking = async () => {
  if (process.env.NODE_ENV === "development") {
    await worker.start({ onUnhandledRequest: "bypass" });
  }
};
