import { useSearchParams } from "react-router-dom";
import { styled } from "styled-components";
import BooksEmpty from "../components/books/BooksEmpty";
import BooksFilter from "../components/books/BooksFilter";
import BooksList from "../components/books/BooksList";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";
import Pagination from "../components/common/Pagination";
import Title from "../components/common/Title";
import useBooks from "../hooks/useBooks";

function Books() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("category_id")
    ? Number(searchParams.get("category_id"))
    : undefined;
  const latest = searchParams.has("latest") ? true : undefined;
  const page = Number(searchParams.get("page") ?? 1);

  const { books, pagination, isEmpty } = useBooks(categoryId, latest, page);

  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <BooksStyle>
        <div className="filter-wrapper">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>

        {!books && <span>로딩중...</span>}
        {books && !isEmpty && (
          <>
            <BooksList books={books!} />
            <Pagination pagination={pagination!} />
          </>
        )}
        {books && isEmpty && <BooksEmpty />}
      </BooksStyle>
    </>
  );
}

const BooksStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;

  .filter-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
`;

export default Books;
