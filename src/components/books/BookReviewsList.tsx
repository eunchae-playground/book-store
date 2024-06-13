import { styled } from "styled-components";
import { BookReview } from "../../models/book.model";
import BookReviewItem from "./BookReviewItem";

interface Props {
  reviews: BookReview[];
  direction?: "column" | "row";
}

function BookReviewsList({ reviews, direction = "column" }: Props) {
  return (
    <BookReviewsListStyle $direction={direction}>
      {reviews.map((review) => (
        <BookReviewItem key={review.id} review={review} />
      ))}
    </BookReviewsListStyle>
  );
}

interface BookReviewsListStyleProps {
  $direction: Props["direction"];
}

const BookReviewsListStyle = styled.div<BookReviewsListStyleProps>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  gap: 4px;
  margin-top: 24px;
`;

export default BookReviewsList;
