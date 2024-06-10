import { useState } from "react";
import { FaSmileWink } from "react-icons/fa";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Button from "../components/common/Button";
import Empty from "../components/common/Empty";
import SpinnerLoader from "../components/common/SpinnerLoader";
import Title from "../components/common/Title";
import OrderDetailModal from "../components/orders/OrderDetailModal";
import useOrders from "../hooks/useOrders";
import { Order } from "../models/order.model";
import { formatDate, formatNumber } from "../utils/format";

function OrdersPage() {
  const { orders, isEmpty, isLoading } = useOrders();
  const [dialogOrder, setDialogOrder] = useState<Order | null>(null);
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);

  // Helper Functions
  const calculateTotalBookAmount = (order: Order) => {
    return order.orderBooks.reduce(
      (totalBookAmount, orderBook) => totalBookAmount + orderBook.amount,
      0
    );
  };
  const calculateTotalPrice = (order: Order) => {
    return order.orderBooks.reduce(
      (totalPrice, orderBook) =>
        totalPrice + orderBook.price * orderBook.amount,
      0
    );
  };

  // Event Handlers
  const handleClickMoreButton = (order: Order) => {
    setIsOpenDetailModal(true);
    setDialogOrder(order);
  };

  return (
    <OrdersPageStyle>
      <Title size="large">주문 내역</Title>

      {!orders && isLoading && <SpinnerLoader />}

      {orders && !isEmpty && (
        <>
          <table>
            <thead>
              <tr>
                <th>주문일자</th>
                <th>주소</th>
                <th>수령인</th>
                <th>상품명</th>
                <th>총 권수</th>
                <th>금액</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{formatDate(order.orderedAt, "YYYY.MM.DD")}</td>
                  <td>{order.address}</td>
                  <td>{order.receiver}</td>
                  <td>
                    {order.orderBooks[0].title} 포함 {order.orderBooks.length}종
                  </td>
                  <td>{calculateTotalBookAmount(order)}권</td>
                  <td>{formatNumber(calculateTotalPrice(order))}원</td>
                  <td>
                    <Button
                      size="small"
                      scheme="normal"
                      onClick={() => handleClickMoreButton(order)}
                    >
                      상세 보기
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <OrderDetailModal
            order={dialogOrder}
            isOpen={isOpenDetailModal}
            setIsOpen={setIsOpenDetailModal}
          />
        </>
      )}

      {orders && isEmpty && (
        <Empty
          icon={<FaSmileWink />}
          title="주문 목록이 비었습니다."
          description={<Link to="/carts">장바구니 목록으로 이동</Link>}
        />
      )}
    </OrdersPageStyle>
  );
}

const OrdersPageStyle = styled.div`
  table {
    width: 100%;
    margin-top: 24px;
    border-collapse: collapse;
    border-top: ${({ theme }) => `1px solid ${theme.color.border}`};

    th,
    td {
      padding: 16px;
      border-bottom: ${({ theme }) => `1px solid ${theme.color.border}`};
      text-align: center;
    }
  }
`;

export default OrdersPage;
