import { FaRegUser, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import useCategories from "../../hooks/useCategories";

export default function Header() {
  const { categories } = useCategories();
  return (
    <HeaderStyle>
      <Link to="/">
        <img className="logo" src={logo} alt="book store logo" />
      </Link>
      <nav className="category">
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                to={
                  category.id === null
                    ? "books"
                    : `/books?category_id=${category.id}`
                }
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="auth">
        <ul>
          <li>
            <Link to="/login">
              <FaSignInAlt />
              로그인
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <FaRegUser />
              회원가입
            </Link>
          </li>
        </ul>
      </nav>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};

  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.background};

  .logo {
    width: 40px;
  }

  .category {
    ul {
      display: flex;
      gap: 32px;
      li {
        a {
          font-size: 1.5rem;
          font-weight: 600;
          color: ${({ theme }) => theme.color.text};
          text-decoration: none;

          &:hover {
            color: ${({ theme }) => theme.color.primary};
          }
        }
      }
    }
  }

  .auth {
    ul {
      display: flex;
      gap: 16px;
      li {
        a {
          display: flex;
          align-items: center;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          svg {
            margin-right: 6px;
          }
        }
      }
    }
  }
`;
