import { FaComment } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { styled } from "styled-components";
import AddCartSection from "../components/books/AddCartSection";
import BookLikeButton from "../components/books/BookLikeButton";
import BookReviewsList from "../components/books/BookReviewsList";
import CreateBookReviewForm from "../components/books/CreateBookReviewForm";
import EllipsisBox from "../components/common/EllipsisBox";
import Empty from "../components/common/Empty";
import SpinnerLoader from "../components/common/SpinnerLoader";
import Title from "../components/common/Title";
import useFetchBook from "../hooks/queries/useFetchBook";
import useFetchBookReviews from "../hooks/queries/useFetchBookReviews";
import { formatDate, formatNumber } from "../utils/format";

function BookDetailPage() {
  const bookId = Number(useParams()["bookId"]);

  const {
    data: book,
    isLoading,
    error,
    isSuccess,
  } = useFetchBook({ id: bookId });

  const { data: reviews, isLoading: reviewsIsLoading } = useFetchBookReviews({
    id: bookId,
  });
  const reviewsIsEmpty = reviews ? reviews.length === 0 : null;
  
  return (
    <BookDetailPageStyle>
      {isLoading && <SpinnerLoader />}

      {isSuccess && (
        <>
          <div className="header">
            <img src={book.image} alt="book" />
            <div className="info">
              <Title size="large" color="text" className="title">
                {book.title}
              </Title>
              <dl>
                <dt>카테고리</dt>
                <dd>
                  <Link to={`/books?category_id=${book.categoryId}`}>
                    {book.categoryName}
                  </Link>
                </dd>
              </dl>
              <dl>
                <dt>포맷</dt>
                <dd>{book.bookFormat}</dd>
              </dl>
              <dl>
                <dt>총 페이지</dt>
                <dd>{book.totalPages}</dd>
              </dl>
              <dl>
                <dt>ISBN</dt>
                <dd>{book.isbn}</dd>
              </dl>
              <dl>
                <dt>출간일</dt>
                <dd>{formatDate(book.pubDate)}</dd>
              </dl>
              <dl>
                <dt>가격</dt>
                <dd>{formatNumber(book.price)}원</dd>
              </dl>

              <p className="summary">{book.summary}</p>
              <BookLikeButton
                size="medium"
                id={book.id}
                likeCount={book.likeCount}
                isLiked={book.isLiked}
              />
              <AddCartSection bookId={book.id} />
            </div>
          </div>

          <div className="content">
            <Title size="medium">상세 설명</Title>
            <EllipsisBox>{book.detail}</EllipsisBox>

            <Title size="medium">목차</Title>
            <p className="table-of-contents">{book.tableOfContents}</p>
          </div>

          <div className="reviews">
            <Title size="medium">리뷰</Title>
            <CreateBookReviewForm bookId={bookId} />

            {reviewsIsLoading && <SpinnerLoader />}
            {reviews && !reviewsIsEmpty && (
              <BookReviewsList reviews={reviews} />
            )}
            {reviews && reviewsIsEmpty && (
              <Empty
                icon={<FaComment />}
                title="아직 리뷰가 존재하지 않습니다!"
              />
            )}
          </div>
        </>
      )}

      {error && <div>{error.message}</div>}
    </BookDetailPageStyle>
  );
}

const BookDetailPageStyle = styled.div`
  .header {
    display: flex;
    align-items: start;
    gap: 24px;
    padding: 0 0 24px 0;

    img {
      width: 500px;
      height: 500px;
    }

    .info {
      display: flex;
      flex-direction: column;
      gap: 12px;
      flex: 1;

      .title {
        margin-bottom: 20px;
      }

      dl {
        display: flex;
        margin: 0;
        dt {
          width: 80px;
          color: ${({ theme }) => theme.color.secondary};
        }

        a {
          color: ${({ theme }) => theme.color.primary};
          text-decoration: none;
        }
      }
    }
  }

  .content {
  }
`;

export default BookDetailPage;
