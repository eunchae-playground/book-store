import { Navigate } from "react-router-dom";
import { styled } from "styled-components";
import { useOrderStore } from "../store/OrderStore";

function OrderPage() {
  const { checkedCarts, isEmptyCheckedCarts } = useOrderStore();

  if (isEmptyCheckedCarts()) {
    return <Navigate to="/" replace />;
  }

  return <OrderPageStyle></OrderPageStyle>;
}

const OrderPageStyle = styled.div``;

export default OrderPage;
