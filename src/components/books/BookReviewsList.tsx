import { styled } from "styled-components";
import { BookReview } from "../../models/book.model";
import BookReviewItem from "./BookReviewItem";

interface Props {
  reviews: BookReview[];
}

function BookReviewsList({ reviews }: Props) {
  return (
    <BookReviewsListStyle>
      {reviews.map((review) => (
        <BookReviewItem key={review.id} review={review} />
      ))}
    </BookReviewsListStyle>
  );
}

const BookReviewsListStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 24px;
`;

export default BookReviewsList;
