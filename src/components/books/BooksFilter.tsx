import { useSearchParams } from "react-router-dom";
import { styled } from "styled-components";
import useCategories from "../../hooks/useCategories";
import Button from "../common/Button";

function BooksFilter() {
  const { categories } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClickCategoryButton = (id: number | null) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (id === null) {
      newSearchParams.delete("category_id");
    } else {
      newSearchParams.set("category_id", id.toString());
    }

    setSearchParams(newSearchParams);
  };

  const handleClickLatestButton = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newSearchParams.has("latest")) {
      newSearchParams.delete("latest");
    } else {
      newSearchParams.set("latest", "true");
    }

    setSearchParams(newSearchParams);
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
