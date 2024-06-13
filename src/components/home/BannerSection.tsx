import { FaSadCry } from "react-icons/fa";
import Slider, { Settings } from "react-slick";
import { styled } from "styled-components";
import useFetchBanners from "../../hooks/queries/useFetchBanners";
import Empty from "../common/Empty";

function BannerSection() {
  const { data, isLoading, isSuccess } = useFetchBanners();
  const isEmpty = data ? data.length === 0 : null;

  const sliderSettings: Settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <BannerSectionStyle>
      {isLoading && <div className="skeleton" />}

      {isSuccess && !isEmpty && (
        <Slider {...sliderSettings}>
          {data.map(({ imageUrl }, index) => (
            <img key={index} src={imageUrl} alt={`banner ${index + 1}`} />
          ))}
        </Slider>
      )}

      {isSuccess && isEmpty && (
        <Empty icon={<FaSadCry />} title="배너가 존재하지 않습니다." />
      )}
    </BannerSectionStyle>
  );
}

const BannerSectionStyle = styled.div`
  .skeleton {
    width: 100%;
    height: 300px;
  }

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
`;

export default BannerSection;
