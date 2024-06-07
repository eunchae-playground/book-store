import { styled } from "styled-components";
import { Cart } from "../../models/cart.model";
import Title from "../common/Title";

interface Props {
  carts: Cart[];
}

function OrderInfo({ carts }: Props) {
  return (
    <OrderInfoStyle>
      <Title size="medium" color="text">
        주문 상품
      </Title>
      <ul>
        {carts.map((item) => (
          <li key={item.id}>
            {item.title} {item.amount}권
          </li>
        ))}
      </ul>
    </OrderInfoStyle>
  );
}

const OrderInfoStyle = styled.div`
  padding: 12px;
  border: ${({ theme }) => `2px solid ${theme.color.border}`};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  ul {
    display: flex;
    flex-direction: column;
    padding: 0;
    li {
      list-style: none;
      line-height: 2;
    }
  }
`;

export default OrderInfo;
