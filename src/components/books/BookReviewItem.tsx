import { FaStar } from "react-icons/fa";
import { styled } from "styled-components";
import { BookReview } from "../../models/book.model";
import { formatDate } from "../../utils/format";

interface Props {
  review: BookReview;
}

function BookReviewItem({
  review: { userName, score, createdAt, content },
}: Props) {
  return (
    <BookReviewItemStyle>
      <div className="review-header">
        <span>{userName}</span>
        <div className="score">
          {Array.from({ length: score }).map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
        <span className="review-date">{formatDate(createdAt)}</span>
      </div>

      <p className="content">{content}</p>
    </BookReviewItemStyle>
  );
}

const BookReviewItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 12px;
  border: ${({ theme }) => `1px solid ${theme.color.border}`};
  border-radius: ${({ theme }) => theme.borderRadius.default};

  .review-header {
    display: flex;
    align-items: center;
    width: 100%;

    .score {
      display: flex;
      margin-left: 4px;
      svg {
        fill: orange;
      }
    }

    .review-date {
      margin-left: auto;
    }
  }

  .content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default BookReviewItem;
