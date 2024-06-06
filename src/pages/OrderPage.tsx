import { Navigate, useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { CheckedCarts } from "../models/cart.model";

function OrderPage() {
  const location = useLocation();
  const checkedCarts = location.state as CheckedCarts;

  if (!checkedCarts) {
    return <Navigate to="/" replace />;
  }

  return <OrderPageStyle></OrderPageStyle>;
}

const OrderPageStyle = styled.div``;

export default OrderPage;
