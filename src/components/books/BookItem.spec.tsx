import { render, screen } from "@testing-library/react";

import { BookStoreThemeProvider } from "../../context/themeContext";
import { Book } from "../../models/book.model";
import { formatNumber } from "../../utils/formatNumber";
import BookItem from "./BookItem";

const book: Book = {
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
  image: "https://picsum.photos/id/1/200/300",
  likeCount: 1,
  isLiked: 1,
  categoryName: "동화",
};

describe("bookItem", () => {
  it("렌더 여부", () => {
    render(
      <BookStoreThemeProvider>
        <BookItem book={book} />
      </BookStoreThemeProvider>
    );

    expect(screen.getByText(book.title)).toBeInTheDocument();
    expect(screen.getByText(book.summary)).toBeInTheDocument();
    expect(screen.getByText(book.author)).toBeInTheDocument();
    expect(screen.getByText(formatNumber(book.price))).toBeInTheDocument();
    expect(screen.getByText(book.likeCount)).toBeInTheDocument();
  });
});
