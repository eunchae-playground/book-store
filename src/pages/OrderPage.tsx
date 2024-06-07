import { Navigate } from "react-router-dom";
import { styled } from "styled-components";
import { useOrderStore } from "../store/OrderStore";
import isEmptyObject from "../utils/isEmptyObject";

function OrderPage() {
  const { checkedCarts } = useOrderStore();

  if (isEmptyObject(checkedCarts)) {
    return <Navigate to="/" replace />;
  }

  return <OrderPageStyle></OrderPageStyle>;
}

const OrderPageStyle = styled.div``;

export default OrderPage;
