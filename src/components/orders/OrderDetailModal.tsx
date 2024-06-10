import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { styled } from "styled-components";
import { Order } from "../../models/order.model";
import { formatNumber } from "../../utils/format";
import Button from "../common/Button";
import Title from "../common/Title";

interface Props {
  order: Order | null;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function OrderDetailModal({ order, isOpen, setIsOpen }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <OrderDetailModalStyle ref={dialogRef}>
      <Title size="medium">주문 상세 정보</Title>
      <table>
        <thead>
          <tr>
            <th>상품명</th>
            <th>권수</th>
            <th>금액</th>
          </tr>
        </thead>
        <tbody>
          {order &&
            order.orderBooks.map((orderBook) => (
              <tr key={`${order.id}-${orderBook.title}`}>
                <td>{orderBook.title}</td>
                <td>{orderBook.amount}권</td>
                <td>{formatNumber(orderBook.price)}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="button-wrapper">
        <Button size="medium" scheme="normal" onClick={() => setIsOpen(false)}>
          닫기
        </Button>
      </div>
    </OrderDetailModalStyle>
  );
}

const OrderDetailModalStyle = styled.dialog`
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.default};

  .button-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 24px;
  }
`;

export default OrderDetailModal;
