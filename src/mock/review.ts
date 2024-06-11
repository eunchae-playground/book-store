import { fakerKO as faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import { BookReviewsResponse } from "../models/book.model";

const mockBookReviewsData: BookReviewsResponse = Array.from({ length: 8 }).map(
  (_, i) => ({
    id: i,
    content: faker.lorem.paragraph(),
    createdAt: faker.date.past().toISOString(),
    score: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
    userName: faker.person.firstName(),
  })
);

export const reviewsById = http.get(
  "http://localhost:3000/books/:id([0-9]+)/reviews",
  () => {
    return HttpResponse.json(mockBookReviewsData, { status: 200 });
  }
);

export const createReview = http.post(
  "http://localhost:3000/books/:id([0-9]+)/reviews",
  () => {
    return HttpResponse.json(null, { status: 201 });
  }
);
