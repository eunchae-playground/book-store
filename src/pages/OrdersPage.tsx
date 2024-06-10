import { FaSmileWink } from "react-icons/fa";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Button from "../components/common/Button";
import Empty from "../components/common/Empty";
import Title from "../components/common/Title";
import useOrders from "../hooks/useOrders";
import { formatDate, formatNumber } from "../utils/format";

function OrdersPage() {
  const { orders, isEmpty, isLoading } = useOrders();

  return (
    <OrdersPageStyle>
      <Title size="large">주문 내역</Title>

      {!orders && isLoading && <span>로딩중...</span>}

      {orders && !isEmpty && (
        <table>
          <thead>
            <tr>
              <th>주문일자</th>
              <th>주소</th>
              <th>수령인</th>
              <th>상품명</th>
              <th>수량</th>
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
                <td>{order.bookTitle}</td>
                <td>{order.bookAmount}</td>
                <td>{formatNumber(order.bookPrice)}원</td>
                <td>
                  <Button size="small" scheme="normal">
                    자세히
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
