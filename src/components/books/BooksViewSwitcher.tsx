import { FaList, FaTh } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { styled } from "styled-components";
import Button from "../common/Button";

const viewOptions = [
  {
    value: "list",
    icon: <FaList />,
  },
  {
    value: "grid",
    icon: <FaTh />,
  },
];

function BooksViewSwitcher() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClickSwitch = (value: string) => {
    searchParams.set("view", value);
    setSearchParams(searchParams);
  };

  return (
    <BooksViewSwitcherStyle>
      {viewOptions.map((option) => (
        <Button
          key={option.value}
          onClick={() => handleClickSwitch(option.value)}
          size="medium"
          scheme={
            (searchParams.get("view") ?? "grid") === option.value
              ? "primary"
              : "normal"
          }
        >
          {option.icon}
        </Button>
      ))}
    </BooksViewSwitcherStyle>
  );
}

const BooksViewSwitcherStyle = styled.div`
  display: flex;
  gap: 8px;
`;

export default BooksViewSwitcher;
