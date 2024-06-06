import { FaSmileWink } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import { styled } from "styled-components";
import BooksFilter from "../components/books/BooksFilter";
import BooksList from "../components/books/BooksList";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";
import Empty from "../components/common/Empty";
import Pagination from "../components/common/Pagination";
import Title from "../components/common/Title";
import useBooks from "../hooks/useBooks";

function BooksPage() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category_id")
    ? Number(searchParams.get("category_id"))
    : undefined;
  const latest = searchParams.has("latest") ? true : undefined;
  const page = Number(searchParams.get("page") ?? 1);

  const { books, pagination, isEmpty, isLoading } = useBooks(
    categoryId,
    latest,
    page
  );

  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <BooksPageStyle>
        <div className="filter-wrapper">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>

        {!books && isLoading && <span>로딩중...</span>}
        {books && !isEmpty && (
          <>
            <BooksList books={books!} />
            <Pagination pagination={pagination!} />
          </>
        )}
        {books && isEmpty && (
          <Empty
            icon={<FaSmileWink />}
            title="검색 결과가 없습니다."
            description={<Link to="/books">전체 검색 결과로 이동</Link>}
          />
        )}
      </BooksPageStyle>
    </>
  );
}

const BooksPageStyle = styled.div`
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

export default BooksPage;
