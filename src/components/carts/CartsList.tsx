import { styled } from "styled-components";
import { Cart } from "../../models/cart.model";
import CartItem from "./CartItem";

interface Props {
  carts: Cart[];
}

function CartsList({ carts }: Props) {
  return (
    <CartsListStyle>
      {carts.map((cart) => (
        <CartItem key={cart.id} cart={cart} />
      ))}
    </CartsListStyle>
  );
}

interface CartsListStyleProps {}

const CartsListStyle = styled.div<CartsListStyleProps>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
`;

export default CartsList;
