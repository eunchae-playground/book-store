import { useNavigate, useSearchParams } from "react-router-dom";
import { styled } from "styled-components";
import { Book } from "../../models/book.model";
import { formatNumber } from "../../utils/format";
import BookLikeButton from "./BookLikeButton";

interface Props {
  book: Book;
}

function BookItem({ book }: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClickBookItem = () => {
    navigate(`/books/${book.id}`);
  };

  return (
    <BookItemStyle
      $isLiked={book.isLiked}
      $view={searchParams.get("view") ?? "grid"}
      onClick={handleClickBookItem}
    >
      <div className="img-wrapper">
        <img src={book.image} alt="book" />
      </div>
      <div className="content">
        <h2 className="title">{book.title}</h2>
        <p className="summary">{book.summary}</p>
        <p className="author">{book.author}</p>
        <p className="price">{formatNumber(book.price)}원</p>
        <BookLikeButton
          size="small"
          id={book.id}
          likeCount={book.likeCount}
          isLiked={book.isLiked}
        />
      </div>
    </BookItemStyle>
  );
}

interface BookItemStyleProps {
  $isLiked: Props["book"]["isLiked"];
  $view: string;
}

const BookItemStyle = styled.div<BookItemStyleProps>`
  position: relative;
  display: flex;
  flex-direction: ${({ $view }) => ($view === "grid" ? "column" : "row")};
  gap: 10px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  padding: 20px;
  cursor: pointer;

  .img-wrapper {
    border-radius: ${({ theme }) => theme.borderRadius.default};
    overflow: hidden;
    width: 180px;
    height: 180px;
    img {
      max-width: 100%;
    }
  }

  .content {
    .title {
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0 0 12px 0;
    }
    .summary {
      font-size: 0.835rem;
      color: ${({ theme }) => theme.color.secondary};
      margin: 0 0 4px 0;
    }
    .author {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.color.secondary};
      margin: 0 0 4px 0;
    }
    .price {
      font-size: 1rem;
      color: ${({ theme }) => theme.color.secondary};
      margin: 0 0 4px 0;
      font-weight: 700;
    }
    .like-button {
      position: absolute;
      bottom: 16px;
      right: 16px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin: 0 0 4px 0;
      font-size: 0.75rem;
      font-weight: 700;
      background-color: inherit;
      border: 1px solid ${({ theme }) => theme.color.border};
      border-radius: ${({ theme }) => theme.borderRadius.default};
      padding: 4px 12px;
      svg {
        fill: ${({ $isLiked }) => ($isLiked ? "red" : "gray")};
      }
    }
  }
`;

export default BookItem;
