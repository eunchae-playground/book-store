import { FaSpinner } from "react-icons/fa";
import { styled } from "styled-components";

function SpinnerLoader() {
  return (
    <SpinnerLoaderStyle>
      <FaSpinner size="40" />
    </SpinnerLoaderStyle>
  );
}

const SpinnerLoaderStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }

  svg {
    animation: spin 1s ease-out infinite;
    fill: ${({ theme }) => theme.color.primary};
  }
`;

export default SpinnerLoader;
