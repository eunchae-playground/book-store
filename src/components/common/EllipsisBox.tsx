import { ReactNode, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { styled } from "styled-components";
import Button from "./Button";

interface Props {
  lineLimit?: number;
  children: ReactNode;
}

function EllipsisBox({ lineLimit = 4, children }: Props) {
  const [expand, setExpand] = useState(false);

  const handleClickToggleButton = () => {
    setExpand(!expand);
  };

  return (
    <EllipsisBoxStyle $lineLimit={lineLimit} $expand={expand}>
      <p>{children}</p>
      <div className="toggle">
        <Button size="small" scheme="normal" onClick={handleClickToggleButton}>
          {expand ? (
            <>
              <FaAngleUp />
              접기
            </>
          ) : (
            <>
              <FaAngleDown />
              열기
            </>
          )}
        </Button>
      </div>
    </EllipsisBoxStyle>
  );
}

interface EllipsisBoxStyleProps {
  $lineLimit: number;
  $expand: boolean;
}

const EllipsisBoxStyle = styled.div<EllipsisBoxStyleProps>`
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${({ $expand, $lineLimit }) =>
      $expand ? null : $lineLimit};
    -webkit-box-orient: vertical;
    padding: 20px 0 0 0;
    margin: 0;
  }

  .toggle {
    display: flex;
    justify-content: end;

    button {
      font-size: 16px;
    }
  }
`;

export default EllipsisBox;
