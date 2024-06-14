import { useSearchParams } from "react-router-dom";
import { styled } from "styled-components";
import useFetchBookCategories from "../../hooks/queries/useFetchBookCategories";
import Button from "../common/Button";

function BooksFilter() {
  const { data: categories, isSuccess: isSuccessFetchBookCategories } =
    useFetchBookCategories();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClickCategoryButton = (id: number | null) => {
    if (id === null) {
      searchParams.delete("category_id");
    } else {
      searchParams.set("category_id", id.toString());
    }
    searchParams.set("page", "1");

    setSearchParams(searchParams);
  };

  const handleClickLatestButton = () => {
    if (searchParams.has("latest")) {
      searchParams.delete("latest");
    } else {
      searchParams.set("latest", "true");
    }

    setSearchParams(searchParams);
  };

  return (
    <BooksFilterStyle>
      <div className="categories">
        {isSuccessFetchBookCategories &&
          [{ id: null, name: "전체" }, ...categories].map((category) => (
            <Button
              size="medium"
              scheme={
                searchParams.get("category_id") ===
                (category.id ? category.id.toString() : null)
                  ? "primary"
                  : "normal"
              }
              key={category.id}
              onClick={() => handleClickCategoryButton(category.id)}
            >
              {category.name}
            </Button>
          ))}
      </div>

      <div className="latest">
        <Button
          size="medium"
          scheme={searchParams.has("latest") ? "primary" : "normal"}
          onClick={handleClickLatestButton}
        >
          신간
        </Button>
      </div>
    </BooksFilterStyle>
  );
}

const BooksFilterStyle = styled.div`
  display: flex;
  gap: 24px;

  .categories {
    display: flex;
    gap: 6px;
  }
`;

export default BooksFilter;
