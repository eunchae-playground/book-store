import { FaSadCry } from "react-icons/fa";
import Slider, { Settings } from "react-slick";
import { styled } from "styled-components";
import useFetchLatestBookReviews from "../../hooks/queries/useFetchLatestBookReviews";
import BookReviewItem from "../books/BookReviewItem";
import Empty from "../common/Empty";
import Title from "../common/Title";

function LatestBookReviewsSection() {
  const sliderSettings: Settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 10000,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  const { data, isLoading, isSuccess } = useFetchLatestBookReviews();
  const isEmpty = data ? data.length === 0 : null;

  return (
    <LatestBookReviewsSectionStyle>
      <Title size="medium" color="primary">
        최신 리뷰
      </Title>
      {isLoading && <div className="skeleton" />}
      {isSuccess && !isEmpty && (
        <Slider {...sliderSettings}>
          {data.map((review) => (
            <div key={review.id} className="book-review-wrapper">
              <BookReviewItem review={review} />
            </div>
          ))}
        </Slider>
      )}
      {isSuccess && isEmpty && (
        <Empty icon={<FaSadCry />} title="아직 리뷰가 없습니다" />
      )}
    </LatestBookReviewsSectionStyle>
  );
}

const LatestBookReviewsSectionStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 40px;

  .book-review-wrapper {
    padding: 4px;
  }
`;

export default LatestBookReviewsSection;
