import { FieldErrors, UseFormRegister } from "react-hook-form";
import { styled } from "styled-components";
import { DeliveryInfo } from "../../models/order.model";
import { useOrderStore } from "../../store/OrderStore";
import InputText from "../common/InputText";
import Title from "../common/Title";
import FindAddressButton from "./FindAddressButton";

interface Props {
  formRegister: UseFormRegister<DeliveryInfo>;
  formErrors: FieldErrors<DeliveryInfo>;
}

function OrderDeliveryForm({ formRegister, formErrors }: Props) {
  const { deliveryInfo, setDeliveryInfo } = useOrderStore();
  const { address, detailAddress, receiver, contact } = deliveryInfo;

  const onCompletedFindAddress = (address: string) => {
    setDeliveryInfo("address", address);
  };

  return (
    <OrderDeliveryFormStyle>
      <Title size="medium" color="text">
        배송 정보
      </Title>
      <div className="form-container">
        <fieldset>
          <label>주소</label>
          <InputText
            {...formRegister("address")}
            readOnly
            value={address}
            style={{ marginRight: "14px" }}
          />
          <FindAddressButton onCompleted={onCompletedFindAddress} />
          {formErrors.address && (
            <p className="error-text">주소를 입력해주세요.</p>
          )}
        </fieldset>
        <fieldset>
          <label>상세 주소</label>
          <InputText
            {...formRegister("detailAddress", { required: true })}
            value={detailAddress}
            onChange={(event) =>
              setDeliveryInfo("detailAddress", event.target.value)
            }
          />
          {formErrors.detailAddress && (
            <p className="error-text">상세 주소를 입력해주세요.</p>
          )}
        </fieldset>
        <fieldset>
          <label>수령인</label>
          <InputText
            {...formRegister("receiver", { required: true })}
            value={receiver}
            onChange={(event) =>
              setDeliveryInfo("receiver", event.target.value)
            }
          />
          {formErrors.receiver && (
            <p className="error-text">수령인을 입력해주세요.</p>
          )}
        </fieldset>
        <fieldset>
          <label>전화번호</label>
          <InputText
            {...formRegister("contact", { required: true })}
            value={contact}
            onChange={(event) => setDeliveryInfo("contact", event.target.value)}
          />
          {formErrors.contact && (
            <p className="error-text">전화번호를 입력해주세요.</p>
          )}
        </fieldset>
      </div>
    </OrderDeliveryFormStyle>
  );
}

const OrderDeliveryFormStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 12px;
  border: ${({ theme }) => `2px solid ${theme.color.border}`};
  border-radius: ${({ theme }) => theme.borderRadius.default};

  .form-container {
    fieldset {
      display: flex;
      flex-wrap: wrap;
      border: none;

      label {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 80px;
      }
      input {
        flex-grow: 1;
      }
      .error-text {
        width: 100%;
        color: red;
        margin: 4px 0 0 0;
      }
    }
  }
`;

export default OrderDeliveryForm;
