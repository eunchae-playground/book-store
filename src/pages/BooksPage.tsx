import { FaSadCry } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { styled } from "styled-components";
import BooksFilter from "../components/books/BooksFilter";
import BooksList from "../components/books/BooksList";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";
import Empty from "../components/common/Empty";
import ObserverTrigger from "../components/common/ObserverTrigger";
import SpinnerLoader from "../components/common/SpinnerLoader";
import Title from "../components/common/Title";
import useFetchBooks from "../hooks/queries/useFetchBooks";

function BooksPage() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category_id")
    ? Number(searchParams.get("category_id"))
    : undefined;
  const latest = searchParams.has("latest") ? true : undefined;

  const {
    data,
    isLoading,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFetchBooks({ categoryId, latest });

  const isEmpty = data?.pages[0].pagination.totalElements === 0;

  return (
    <>
      <Title size="large">도서 목록</Title>
      <BooksPageStyle>
        <div className="filter-wrapper">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>

        {isEmpty && (
          <Empty icon={<FaSadCry />} title="해당 도서가 존재하지 않습니다." />
        )}

        {isSuccess &&
          data.pages.map((page) => (
            <BooksList key={page.pagination.page} books={page.data} />
          ))}

        {(isLoading || isFetchingNextPage) && <SpinnerLoader />}

        {hasNextPage && !isFetchingNextPage && (
          <ObserverTrigger callback={fetchNextPage} />
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
