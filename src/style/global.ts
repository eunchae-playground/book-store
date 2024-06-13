import "sanitize.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { createGlobalStyle } from "styled-components";
import { ThemeName } from "./theme";

interface Props {
  themeName: ThemeName;
}

export const GlobalStyle = createGlobalStyle<Props>`
  body{
    margin: 0;
    padding: 0;
    background-color: ${(props) =>
      props.themeName === "light" ? "white" : "black"}
  }

  h1{
    margin: 0;
  }

  * {
    color: ${(props) => (props.themeName === "light" ? "black" : "white")}
  }

  /*
  react-slick CSS
  */
  .slick-next {
    right: 10px;

  }
  .slick-prev {
    left: 10px;
    z-index: 2;
  }
  .slick-prev:before,
  .slick-next:before {
    color: #ff5a1d;
  }
  .slick-dots{
    bottom: 4px;

    .slick-active{
      button:before{
        color: #ff5a1d !important;
      }
    }

    li{
      button:before{
        font-size: 14px;
      }
    }
  }
`;
