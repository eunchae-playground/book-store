import { styled } from "styled-components";
import { useCreateOrderStore } from "../../store/createOrderStore";
import { formatNumber } from "../../utils/format";
import Title from "../common/Title";

function CartsOrderSummarySection() {
  const { checkedBookCarts } = useCreateOrderStore();
  const [totalAmount, totalPrice] = Object.values(checkedBookCarts).reduce(
    (totalAmountAndTotalPrice, { amount, price }) => {
      return [
        totalAmountAndTotalPrice[0] + amount,
        totalAmountAndTotalPrice[1] + amount * price,
      ];
    },
    [0, 0]
  );

  return (
    <CartsOrderSummarySectionStyle>
      <Title size="medium" color="text">
        주문 요약
      </Title>
      <dl>
        <dt>총 수량</dt>
        <dd>{totalAmount}권</dd>
        <dt>총 금액</dt>
        <dd>{formatNumber(totalPrice)}원</dd>
      </dl>
    </CartsOrderSummarySectionStyle>
  );
}

const CartsOrderSummarySectionStyle = styled.div`
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
`;

export default CartsOrderSummarySection;
