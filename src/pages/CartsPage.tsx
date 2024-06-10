import { IoCartSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import CartsList from "../components/carts/CartsList";
import CartsOrderSummarySection from "../components/carts/CartsOrderSummarySection";
import Button from "../components/common/Button";
import Empty from "../components/common/Empty";
import SpinnerLoader from "../components/common/SpinnerLoader";
import Title from "../components/common/Title";
import useCarts from "../hooks/useCarts";
import { useOrderStore } from "../store/OrderStore";

function CartsPage() {
  const navigate = useNavigate();
  const { carts, isEmpty, isLoading, refetch } = useCarts();
  const { isEmptyCheckedCarts } = useOrderStore();

  const handleClickOrderButton = () => {
    if (isEmptyCheckedCarts()) return;
    navigate("/orders/new");
  };

  return (
    <CartsPageStyle>
      <Title size="large">장바구니</Title>
      {!carts && isLoading && <SpinnerLoader />}
      {carts && !isEmpty && (
        <div className="carts-container">
          <CartsList carts={carts} refetchCarts={refetch} />
          <div className="summary-and-button">
            <CartsOrderSummarySection />
            <Button
              disabled={isEmptyCheckedCarts()}
              size="medium"
              scheme="primary"
              onClick={handleClickOrderButton}
            >
              주문하기
            </Button>
          </div>
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

    .summary-and-button {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 240px;
      min-height: 260px;
    }
  }
`;

export default CartsPage;
