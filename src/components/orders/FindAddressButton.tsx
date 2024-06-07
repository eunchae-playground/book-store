import { useEffect } from "react";
import { styled } from "styled-components";
import Button from "../common/Button";

interface Props {
  onCompleted: (address: string) => void;
}

function FindAddressButton({ onCompleted }: Props) {
  const handleClickButton = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        onCompleted(data.address as string);
      },
    }).open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <FindAddressButtonStyle
      size="medium"
      scheme="normal"
      onClick={handleClickButton}
    >
      주소 찾기
    </FindAddressButtonStyle>
  );
}

const FindAddressButtonStyle = styled(Button)``;

export default FindAddressButton;
