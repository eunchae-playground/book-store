import { useSearchParams } from "react-router-dom";
import { styled } from "styled-components";
import { PaginationData } from "../../models/pagination.model";
import Button from "./Button";

interface Props {
  pagination: PaginationData;
}

function Pagination({ pagination }: Props) {
  const [searchParam, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParam.get("page") ?? 1);

  const { size, totalElements } = pagination;
  const pages = Math.ceil(totalElements / size);

  const handleClickPageButton = (page: number) => {
    searchParam.set("page", page.toString());
    setSearchParams(searchParam);
  };
  return (
    <PaginationStyle>
      {pages > 0 && (
        <ol>
          {Array(pages)
            .fill(0)
            .map((_, index) => (
              <li key={index}>
                <Button
                  size="small"
                  scheme={index + 1 === currentPage ? "primary" : "normal"}
                  onClick={() => handleClickPageButton(index + 1)}
                >
                  {index + 1}
                </Button>
              </li>
            ))}
        </ol>
      )}
    </PaginationStyle>
  );
}

const PaginationStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 0;

  ol {
    display: flex;
    gap: 8px;
    list-style: none;
    margin: 0;
  }
`;

export default Pagination;
