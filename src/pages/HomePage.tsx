import { styled } from "styled-components";
import BannerSection from "../components/home/BannerSection";
import BestSellerSection from "../components/home/BestSellerSection";
import LatestBookReviewsSection from "../components/home/LatestBookReviewsSection";
import LatestBooksSection from "../components/home/LatestBooksSection";

function HomePage() {
  return (
    <HomePageStyle>
      <BannerSection />
      <BestSellerSection />
      <LatestBooksSection />
      <LatestBookReviewsSection />
    </HomePageStyle>
  );
}

const HomePageStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export default HomePage;
