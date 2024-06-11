import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { createBookReview } from "../../api/book.api";
import useModal from "../../hooks/useModal";
import { CreateBookReviewRequest } from "../../models/book.model";
import Button from "../common/Button";

interface Props {
  bookId: number;
}

function CreateBookReviewForm({ bookId }: Props) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CreateBookReviewRequest["payload"]>();
  const { showToast } = useModal();

  const onSubmit = async () => {
    try {
      const content = getValues("content");
      const score = getValues("score");
      await createBookReview({
        routeParams: { bookId },
        payload: { content, score },
      });
      showToast("리뷰가 작성되었습니다.");
    } catch (error) {}
  };

  return (
    <CreateBookReviewFormStyle>
      <textarea {...register("content", { required: true })}></textarea>

      <select {...register("score", { required: true, valueAsNumber: true })}>
        <option value="1">1점</option>
        <option value="2">2점</option>
        <option value="3">3점</option>
        <option value="4">4점</option>
        <option value="5">5점</option>
      </select>

      {(errors.content || errors.content) && (
        <p className="error-text">리뷰 내용과 평점을 모두 작성해 주세요.</p>
      )}

      <Button size="medium" scheme="primary" onClick={handleSubmit(onSubmit)}>
        리뷰 작성
      </Button>
    </CreateBookReviewFormStyle>
  );
}

const CreateBookReviewFormStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;

  textarea {
    width: 100%;
    height: 100px;
    border: ${({ theme }) => `1px solid ${theme.color.border}`};
  }

  select {
    padding: 4px;
  }

  .error-text {
    width: 100%;
    color: red;
    text-align: right;
  }
`;

export default CreateBookReviewForm;
