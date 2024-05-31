import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "../common/Footer";
import Header from "../common/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <LayoutStyle>
        <Outlet />
      </LayoutStyle>
      <Footer />
    </>
  );
}

const LayoutStyle = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  padding: 20px 0;
`;
