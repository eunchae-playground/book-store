import { styled } from "styled-components";
import logo from "../../assets/images/logo.png";

function Footer() {
  return (
    <FooterStyle>
      <img className="logo" src={logo} alt="book store logo" />
      <div className="copyright">
        <p>copyright(c), 2024, book store.</p>
      </div>
    </FooterStyle>
  );
}

const FooterStyle = styled.footer`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  border-top: 1px solid ${({ theme }) => theme.color.background};
  padding: 20px 0;

  .logo {
    width: 24px;
  }

  .copyright {
    p {
      margin: 0;
      font-size: 0.75rem;
      color: ${({ theme }) => theme.color.text};
    }
  }
`;

export default Footer;
