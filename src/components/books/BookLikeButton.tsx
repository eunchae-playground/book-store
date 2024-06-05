import { isAxiosError } from "axios";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { styled } from "styled-components";
import { toggleBookLike } from "../../api/book.api";
import useAlert from "../../hooks/useAlert";
import { Book } from "../../models/book.model";
import { useAuthStore } from "../../store/authStore";
import { ButtonSize } from "../../style/theme";
import Button from "../common/Button";

type Props = Pick<Book, "id" | "likeCount" | "isLiked"> & {
  size: ButtonSize;
};

function BookLikeButton(props: Props) {
  const { isLoggedIn } = useAuthStore();
  const showAlert = useAlert();
  const [likeCount, setLikeCount] = useState(props.likeCount);
  const [isLiked, setIsLiked] = useState(!!props.isLiked);

  const handleClickLikeButton = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();

    if (!isLoggedIn) return;

    try {
      const { isLiked: updatedIsLiked } = await toggleBookLike({
        id: props.id,
      });

      setIsLiked(updatedIsLiked);

      if (updatedIsLiked) {
        setLikeCount(likeCount + 1);
      } else {
        setLikeCount(likeCount - 1);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        showAlert(error.message);
      }
    }
  };

  return (
    <BookLikeButtonStyle $likeCount={likeCount} $isLiked={isLiked}>
      <Button
        size={props.size}
        scheme="normal"
        disabled={!isLoggedIn}
        onClick={(event) => handleClickLikeButton(event)}
      >
        <FaHeart />
        {likeCount}
      </Button>
    </BookLikeButtonStyle>
  );
}

interface BookLikeButtonStyleProps {
  $likeCount: number;
  $isLiked: boolean;
}

const BookLikeButtonStyle = styled.div<BookLikeButtonStyleProps>`
  button {
    display: flex;
    gap: 4px;
    color: ${({ theme, $isLiked }) =>
      $isLiked ? "coral" : theme.color.secondary};
    background-color: white;
    border: 1px solid
      ${({ theme, $isLiked }) => ($isLiked ? "coral" : theme.color.border)};
    svg {
      fill: ${({ theme, $isLiked }) =>
        $isLiked ? "coral" : theme.color.secondary};
    }
  }
`;

export default BookLikeButton;
