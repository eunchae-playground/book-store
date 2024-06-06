import { isAxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { addCart } from "../../api/cart.api";
import useAlert from "../../hooks/useAlert";
import { useAuthStore } from "../../store/authStore";
import Button from "../common/Button";
import InputText from "../common/InputText";

interface Props {
  bookId: number;
}

function AddCartSection({ bookId }: Props) {
  const [amount, setAmount] = useState(1);
  const { isLogin } = useAuthStore();
  const showAlert = useAlert();
  const navigate = useNavigate();

  const handleClickAddCart = async () => {
    if (!isLogin) {
      showAlert("로그인이 필요합니다.");
      navigate("/login");
    }

    if (!amount) {
      showAlert("올바른 수량을 입력해주세요.");
      return;
    }

    try {
      await addCart({ bookId, amount });
      showAlert("장바구니에 추가되었습니다.");
    } catch (error) {
      if (isAxiosError(error)) {
        showAlert(error.response!.data.message);
      }
    }
  };

  return (
    <AddCartSectionStyle>
      <div>
        <label>수량</label>
        <InputText
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
          type="number"
          placeholder="수량"
          min="1"
        />
      </div>

      <Button size="medium" scheme="primary" onClick={handleClickAddCart}>
        장바구니 담기
      </Button>
    </AddCartSectionStyle>
  );
}

const AddCartSectionStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  margin-top: 40px;

  label {
    margin-right: 10px;
  }
  input {
    width: 60px;
  }
`;

export default AddCartSection;
