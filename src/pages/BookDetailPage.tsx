import { Link, useParams } from "react-router-dom";
import { styled } from "styled-components";
import AddCartSection from "../components/books/AddCartSection";
import BookLikeButton from "../components/books/BookLikeButton";
import EllipsisBox from "../components/common/EllipsisBox";
import Title from "../components/common/Title";
import useBook from "../hooks/useBook";
import { formatDate, formatNumber } from "../utils/format";

function BookDetailPage() {
  const { bookId } = useParams();
  const { book, isLoading, error } = useBook(Number(bookId));

  return (
    <BookDetailPageStyle>
      {isLoading && <div>로딩중...</div>}

      {book && (
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
