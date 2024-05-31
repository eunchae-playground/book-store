import { render, screen } from "@testing-library/react";
import React from "react";
import { BookStoreThemeProvider } from "../../context/themeContext";
import InputText from "./InputText";

describe("InputText 컴포넌트 테스트", () => {
  it("렌더 확인", () => {
    // 1. 렌더
    render(
      <BookStoreThemeProvider>
        <InputText placeholder="입력하세요" />
      </BookStoreThemeProvider>
    );

    // 2. 확인
    expect(screen.getByPlaceholderText("입력하세요")).toBeInTheDocument();
  });

  it("forwardRef 테스트", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(
      <BookStoreThemeProvider>
        <InputText placeholder="입력하세요" ref={ref} />
      </BookStoreThemeProvider>
    );

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
