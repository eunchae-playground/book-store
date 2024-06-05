import { isAxiosError } from "axios";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { styled } from "styled-components";
import { toggleBookLike } from "../../api/book.api";
import useAlert from "../../hooks/useAlert";
import { Book } from "../../models/book.model";
import { useAuthStore } from "../../store/authStore";
import { formatNumber } from "../../utils/formatNumber";
import Button from "../common/Button";

interface Props {
  book: Book;
}

function BookItem({ book }: Props) {
  const showAlert = useAlert();
  const [searchParams] = useSearchParams();
  const { isLoggedIn } = useAuthStore();
  const [isLiked, setIsLiked] = useState(Boolean(book.isLiked) || false);
  const [likeCount, setLikeCount] = useState(book.likeCount);

  const handleClickLikeButton = async () => {
    if (!isLoggedIn) return;
    try {
      const { isLiked: updatedIsLiked } = await toggleBookLike({ id: book.id });

      setIsLiked(updatedIsLiked);

      if (updatedIsLiked) {
        setLikeCount(likeCount + 1);
      } else {
        setLikeCount(likeCount - 1);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        showAlert(error.message);
      }
    }
  };
  return (
    <BookItemStyle
      $isLiked={isLiked}
      $view={searchParams.get("view") ?? "grid"}
    >
      <div className="img-wrapper">
        <img src={book.image} alt="book" />
      </div>
      <div className="content">
        <h2 className="title">{book.title}</h2>
        <p className="summary">{book.summary}</p>
        <p className="author">{book.author}</p>
        <p className="price">{formatNumber(book.price)}원</p>
        <Button
          size="medium"
          scheme="normal"
          className="like-button"
          onClick={handleClickLikeButton}
          disabled={!isLoggedIn}
        >
          <FaHeart />
          <span>{likeCount}</span>
        </Button>
      </div>
    </BookItemStyle>
  );
}

interface BookItemStyleProps {
  $isLiked: boolean;
  $view: string;
}

const BookItemStyle = styled.div<BookItemStyleProps>`
  position: relative;
  display: flex;
  flex-direction: ${({ $view }) => ($view === "grid" ? "column" : "row")};
  gap: 10px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  padding: 20px;

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
