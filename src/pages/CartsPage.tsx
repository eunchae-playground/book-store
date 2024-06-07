import { IoCartSharp } from "react-icons/io5";
import { styled } from "styled-components";
import CartsList from "../components/carts/CartsList";
import CartsToOrderSection from "../components/carts/CartsToOrderSection";
import Empty from "../components/common/Empty";
import Title from "../components/common/Title";
import useCarts from "../hooks/useCarts";

function CartsPage() {
  const { carts, isEmpty, isLoading, refetch } = useCarts();

  return (
    <CartsPageStyle>
      <Title size="large">장바구니</Title>
      {!carts && isLoading && <span>로딩중...</span>}
      {carts && !isEmpty && (
        <div className="carts-container">
          <CartsList carts={carts} refetchCarts={refetch} />
          <CartsToOrderSection />
        </div>
      )}
      {carts && isEmpty && (
        <Empty icon={<IoCartSharp />} title="장바구니가 비었습니다." />
      )}
    </CartsPageStyle>
  );
}

const CartsPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;

  .carts-container {
    display: flex;
    gap: 24px;
  }
`;

export default CartsPage;
