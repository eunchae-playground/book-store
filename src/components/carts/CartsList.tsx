import { styled } from "styled-components";
import { Cart, CheckedCarts } from "../../models/cart.model";
import CartItem from "./CartItem";
import { Dispatch, SetStateAction } from "react";

interface Props {
  carts: Cart[];
  refetchCarts: () => void;
  setCheckedCarts : Dispatch<SetStateAction<CheckedCarts>>
}

function CartsList({ carts, refetchCarts, setCheckedCarts }: Props) {
  return (
    <CartsListStyle>
      {carts.map((cart) => (
        <CartItem key={cart.id} cart={cart} refetchCarts={refetchCarts} setCheckedCarts={setCheckedCarts} />
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
