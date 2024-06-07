import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useOrderStore } from "../../store/OrderStore";
import { formatNumber } from "../../utils/format";
import Button from "../common/Button";
import Title from "../common/Title";

function CartsToOrderSection() {
  const navigate = useNavigate();
  const { checkedCarts } = useOrderStore();
  const [totalAmount, totalPrice] = Object.values(checkedCarts).reduce(
    (totalAmountAndTotalPrice, { amount, price }) => {
      return [
        totalAmountAndTotalPrice[0] + amount,
        totalAmountAndTotalPrice[1] + amount * price,
      ];
    },
    [0, 0]
  );
  const hasCart = totalAmount > 0;

  const handleClickOrderButton = () => {
    if (!hasCart) return;
    navigate("/orders/new");
  };

  return (
    <CartsToOrderSectionStyle>
      <Title size="medium" color="text">
        주문 요약
      </Title>
      <dl>
        <dt>총 수량</dt>
        <dd>{totalAmount}권</dd>
        <dt>총 금액</dt>
        <dd>{formatNumber(totalPrice)}원</dd>
      </dl>
      <Button
        disabled={!hasCart}
        size="medium"
        scheme="primary"
        onClick={handleClickOrderButton}
      >
        주문하기
      </Button>
    </CartsToOrderSectionStyle>
  );
}

const CartsToOrderSectionStyle = styled.div`
  position: relative;
  width: 240px;
  min-height: 260px;
  padding: 12px;

  dl {
    display: grid;
    grid-template-columns: 70px 1fr;
    grid-gap: 10px;

    dd {
      font-weight: 600;
      text-align: end;
    }
  }

  button {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 12px;
  }
`;

export default CartsToOrderSection;
