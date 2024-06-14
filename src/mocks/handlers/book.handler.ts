import { http, HttpResponse } from "msw";
import { BestSellerBooksResponse } from "../../models/book.model";

const mockBestSellerBooks: BestSellerBooksResponse = [
  {
    id: 6,
    categoryId: 1,
    title: "어린왕자들",
    bookFormat: "종이책",
    isbn: "0",
    summary: "어리다..",
    detail: "많이 어리다..",
    author: "김어림",
    totalPages: 100,
    tableOfContents: "목차입니다.",
    price: 20000,
    pubDate: "2019-01-01",
    image: "https://picsum.photos/id/1/600",
    likeCount: 1,
    categoryName: "동화",
  },
  {
    id: 7,
    categoryId: 1,
    title: "신데렐라들",
    bookFormat: "종이책",
    isbn: "1",
    summary: "유리구두..",
    detail: "투명한 유리구두..",
    author: "김구두",
    totalPages: 100,
    tableOfContents: "목차입니다.",
    price: 20000,
    pubDate: "2023-12-01",
    image: "https://picsum.photos/id/2/600",
    likeCount: 2,
    categoryName: "동화",
  },
  {
    id: 8,
    categoryId: 1,
    title: "백설공주들",
    bookFormat: "종이책",
    isbn: "2",
    summary: "사과..",
    detail: "빨간 사과..",
    author: "김사과",
    totalPages: 100,
    tableOfContents: "목차입니다.",
    price: 20000,
    pubDate: "2023-11-01",
    image: "https://picsum.photos/id/3/600",
    likeCount: 0,
    categoryName: "동화",
  },
  {
    id: 9,
    categoryId: 2,
    title: "흥부와 놀부들",
    bookFormat: "종이책",
    isbn: "3",
    summary: "제비..",
    detail: "까만 제비..",
    author: "김제비",
    totalPages: 100,
    tableOfContents: "목차입니다.",
    price: 20000,
    pubDate: "2024-04-08",
    image: "https://picsum.photos/id/4/600",
    likeCount: 0,
    categoryName: "소설",
  },
];

const bestSellerBooks = http.get(
  "http://localhost:3000/books/best-seller",
  () => {
    return HttpResponse.json(mockBestSellerBooks, { status: 200 });
  }
);

const bookHandlers = [bestSellerBooks];

export default bookHandlers;