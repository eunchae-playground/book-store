import { useSearchParams } from "react-router-dom";
import { styled } from "styled-components";
import { Book } from "../../models/book.model";
import BookItem from "./BookItem";

interface Props {
  books: Book[];
}

function BooksList({ books }: Props) {
  const [searchParams] = useSearchParams();

  return (
    <BooksListStyle $view={searchParams.get("view") ?? "grid"}>
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </BooksListStyle>
  );
}

interface BooksListStyleProps {
  $view: string | null;
}

const BooksListStyle = styled.div<BooksListStyleProps>`
  display: grid;
  grid-template-columns: ${({ $view }) =>
    $view === "grid" ? "repeat(4, 1fr)" : "repeat(1, 1fr)"};
  gap: 24px;
`;

export default BooksList;
