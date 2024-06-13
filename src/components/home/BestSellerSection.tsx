import { styled } from "styled-components";
import useFetchBestSellerBooks from "../../hooks/queries/useFetchBestSellerBooks";
import BookItem from "../books/BookItem";
import Title from "../common/Title";

function BestSellerSection() {
  const { data, isLoading, isSuccess } = useFetchBestSellerBooks();
  return (
    <BestSellerSectionStyle>
      <Title size="medium" color="primary">
        베스트 셀러
      </Title>
      {isLoading && <div className="skeleton" />}
      {isSuccess && (
        <div className="books-list">
          {data.map((book, index) => (
            <div key={book.id} className="book-item-wrapper">
              <div className="number-tag">{index + 1}</div>
              <BookItem book={book} />
            </div>
          ))}
        </div>
      )}
    </BestSellerSectionStyle>
  );
}

const BestSellerSectionStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .skeleton {
    height: 200px;
    background-color: #f9f9f9;
  }

  .books-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;

    .book-item-wrapper {
      position: relative;
      .number-tag {
        z-index: 10;
        position: absolute;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        color: white;
        font-weight: bold;
        background-color: coral;
        opacity: 1;
      }
    }
  }
`;

export default BestSellerSection;
