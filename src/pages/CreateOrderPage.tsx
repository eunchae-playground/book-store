import { isAxiosError } from "axios";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { createOrder } from "../api/order.api";
import CartsOrderSummarySection from "../components/carts/CartsOrderSummarySection";
import Button from "../components/common/Button";
import Title from "../components/common/Title";
import OrderDeliveryForm from "../components/orders/OrderDeliveryForm";
import OrderInfo from "../components/orders/OrderInfo";
import useModal from "../hooks/useModal";
import { CreateOrderRequest, DeliveryInfo } from "../models/order.model";
import { useCreateOrderStore } from "../store/createOrderStore";

function CreateOrderPage() {
  const isSubmitted = useRef(false);

  const {
    register: deliveryFormRegister,
    handleSubmit,
    setError: setDeliveryFormError,
    formState: { errors: deliveryFormErrors },
  } = useForm<DeliveryInfo>();
  const navigate = useNavigate();
  const { showToast, showAlert, showConfirm } = useModal();

  const {
    checkedBookCarts,
    deliveryInfo,
    isEmptyCheckedBookCarts,
    resetCheckedBookCarts,
  } = useCreateOrderStore();

  // cartId 기준 오름차순으로 정렬
  const checkedBookCartsArray = Object.values(checkedBookCarts).sort(
    ({ id: currentId }, { id: nextId }) => currentId - nextId
  );

  /*
  체크된 장바구니가 없을 때 "/"로 리다이렉트하는 로직인데,
  주문이 완료됐을때 resetCheckedBookCarts 함수가 호출되어 리렌더링이 되기 때문에
  주문이 완료되고 "/"로 가는걸 막기위해 !isSubmitted.current을 조건에 추가
  */
  if (!isSubmitted.current && isEmptyCheckedBookCarts()) {
    return <Navigate to="/" replace />;
  }

  const validateAddress = () => {
    if (!deliveryInfo.address) {
      setDeliveryFormError("address", {
        type: "validate",
        message: "주소를 입력해주세요.",
      });
      return false;
    }

    return true;
  };

  const onSubmitOrder = async () => {
    if (isEmptyCheckedBookCarts()) return;
    if (!validateAddress()) return;
    if (!showConfirm("주문하시겠습니까?")) return;

    try {
      const orderBooks: CreateOrderRequest["orderBooks"] =
        checkedBookCartsArray.map(({ bookId, amount: bookAmount }) => ({
          bookId,
          bookAmount,
        }));
      await createOrder({ deliveryInfo, orderBooks });
      isSubmitted.current = true;
      resetCheckedBookCarts();
      showToast("주문이 완료되었습니다.");
      navigate("/orders");
      return;
    } catch (error) {
      if (isAxiosError(error)) {
        showAlert(error.response!.data.message || error.message);
      }
    }
  };

  return (
    <CreateOrderPageStyle>
      <Title size="large">주문서 작성</Title>

      <div className="order-container">
        <div className="delivery-and-order-info">
          <OrderDeliveryForm
            formRegister={deliveryFormRegister}
            formErrors={deliveryFormErrors}
          />
          <OrderInfo carts={checkedBookCartsArray} />
        </div>

        <div className="summary-and-button">
          <CartsOrderSummarySection />
          <Button
            disabled={isEmptyCheckedBookCarts()}
            size="medium"
            scheme="primary"
            onClick={handleSubmit(onSubmitOrder, validateAddress)}
          >
            결제하기
          </Button>
        </div>
      </div>
    </CreateOrderPageStyle>
  );
}

const CreateOrderPageStyle = styled.div`
  .order-container {
    display: flex;
    gap: 24px;
    margin-top: 24px;
    .delivery-and-order-info {
      display: flex;
      flex-direction: column;
      gap: 12px;
      flex-grow: 1;
    }

    .summary-and-button {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 240px;
      min-height: 260px;
    }
  }
`;

export default CreateOrderPage;
