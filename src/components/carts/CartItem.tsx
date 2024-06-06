import { isAxiosError } from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { styled } from "styled-components";
import { deleteCart } from "../../api/cart.api";
import useModal from "../../hooks/useModal";
import { Cart, CheckedCarts } from "../../models/cart.model";
import { formatNumber } from "../../utils/format";
import Button from "../common/Button";

interface Props {
  cart: Cart;
  refetchCarts: () => void;
  setCheckedCarts: Dispatch<SetStateAction<CheckedCarts>>;
}

function CartItem({ cart, refetchCarts, setCheckedCarts }: Props) {
  const cartStringId = `cart-${cart.id}`;

  const [isChecked, setIsChecked] = useState(false);
  const { showToast, showAlert, showConfirm } = useModal();

  const addToCheckedCarts = () => {
    setCheckedCarts((prevCheckedCarts) => {
      const newCheckedCarts = { ...prevCheckedCarts };
      newCheckedCarts[cart.id] = cart;
      return newCheckedCarts;
    });
  };

  const deleteFromCheckedCarts = () => {
    setCheckedCarts((prevCheckedCarts) => {
      const newCheckedCarts = { ...prevCheckedCarts };
      delete newCheckedCarts[cart.id];
      return newCheckedCarts;
    });
  };

  const handleCheckItem = () => {
    setIsChecked(!isChecked);
    // 리액트는 state 변경을 배치로 처리하므로 현재 isChecked는 바뀌기전 상태를 가진다.
    if (isChecked) {
      deleteFromCheckedCarts();
    } else {
      addToCheckedCarts();
    }
  };

  const handleClickDeleteCartButton = async () => {
    if (!showConfirm("장바구니에서 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteCart({ id: cart.id });
      showToast("장바구니에서 삭제되었습니다.");
      deleteFromCheckedCarts();
      refetchCarts();
    } catch (error) {
      if (isAxiosError(error)) {
        showAlert(error.response?.data.message || error.message);
      }
    }
  };

  return (
    <CartItemStyle htmlFor={cartStringId} $isChecked={isChecked}>
      <input
        type="checkbox"
        id={cartStringId}
        checked={isChecked}
        onChange={handleCheckItem}
      />

      <div className="content">
        <h2 className="title">{cart.title}</h2>
        <p className="summary">{cart.detail}</p>
        <p className="price">{formatNumber(cart.price)}원</p>
        <p className="author">{cart.amount}권</p>
      </div>

      <Button
        size="medium"
        scheme="normal"
        onClick={handleClickDeleteCartButton}
      >
        장바구니 삭제
      </Button>
    </CartItemStyle>
  );
}

interface CartItemStyleProps {
  $isChecked: boolean;
}

const CartItemStyle = styled.label<CartItemStyleProps>`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 12px;
  border: ${({ $isChecked, theme }) =>
    `2px solid ${$isChecked ? theme.color.secondary : theme.color.border}`};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  cursor: pointer;

  .content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-grow: 1;
    * {
      margin: 0;
    }
  }
`;

export default CartItem;
