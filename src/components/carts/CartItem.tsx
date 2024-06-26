import { styled } from "styled-components";
import useDeleteCart from "../../hooks/mutations/useDeleteCart";
import useModal from "../../hooks/useModal";
import { Cart } from "../../models/cart.model";
import { useCreateOrderStore } from "../../store/createOrderStore";
import { formatNumber } from "../../utils/format";
import Button from "../common/Button";

interface Props {
  cart: Cart;
}

function CartItem({ cart }: Props) {
  const cartStringId = `cart-${cart.id}`;

  const { mutateAsync: deleteCartMutateAsync } = useDeleteCart({ id: cart.id });

  const { showConfirm } = useModal();
  const { checkedBookCarts, toggleCheckedBookCart, deleteCheckedBookCart } =
    useCreateOrderStore();
  const isChecked = cart.bookId in checkedBookCarts;

  const handleCheckItem = () => {
    toggleCheckedBookCart(cart);
  };

  const handleClickDeleteCartButton = async () => {
    if (!showConfirm("장바구니에서 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteCartMutateAsync();
      deleteCheckedBookCart(cart.bookId);
    } catch (error) {}
  };

  return (
    <CartItemStyle htmlFor={cartStringId} $isChecked={isChecked}>
      <input
        type="checkbox"
        id={cartStringId}
        checked={isChecked}
        onChange={handleCheckItem}
      />

      <img src={cart.image} alt="cart" />

      <div className="content">
        <h2 className="title">{cart.title}</h2>
        <p className="detail">{cart.detail}</p>
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
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 20px;
  padding: 12px;
  border: ${({ $isChecked, theme }) =>
    `2px solid ${$isChecked ? theme.color.secondary : theme.color.border}`};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  cursor: pointer;

  img {
    width: 180px;
    height: 180px;
    border-radius: ${({ theme }) => theme.borderRadius.default};
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 10px;
    width: 340px;
    * {
      margin: 0;
    }
    .title {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .detail {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
  }
`;

export default CartItem;
