import { FaSadCry } from "react-icons/fa";
import { styled } from "styled-components";
import useFetchBooks from "../../hooks/queries/useFetchBooks";
import BooksList from "../books/BooksList";
import Empty from "../common/Empty";
import Title from "../common/Title";

function LatestBooksSection() {
  const { data, isLoading, isSuccess } = useFetchBooks({ latest: true });
  const isEmpty = data?.pages[0].data.length === 0;
  return (
    <LatestBooksSectionStyle>
      <Title size="medium" color="primary">
        신간 안내
      </Title>
      {isLoading && <div className="skeleton" />}
      {isSuccess && !isEmpty && <BooksList books={data.pages[0].data} />}
      {isSuccess && isEmpty && (
        <Empty icon={<FaSadCry />} title="신간이 아직 출시되지 않았습니다" />
      )}
    </LatestBooksSectionStyle>
  );
}

const LatestBooksSectionStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .skeleton {
    height: 200px;
    background-color: #f9f9f9;
  }
`;

export default LatestBooksSection;
