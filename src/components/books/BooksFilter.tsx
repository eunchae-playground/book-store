import { useSearchParams } from "react-router-dom";
import { styled } from "styled-components";
import useCategories from "../../hooks/useCategories";
import Button from "../common/Button";

function BooksFilter() {
  const { categories } = useCategories();
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
        {categories.map((category) => (
          <Button
            size="medium"
            scheme={category.isActive ? "primary" : "normal"}
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
