import { FaRegUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../../api/auth.api";
import logo from "../../../assets/images/logo.png";
import useAlert from "../../../hooks/useAlert";
import useCategories from "../../../hooks/useCategories";
import { useAuthStore } from "../../../store/authStore";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  const showAlert = useAlert();
  const navigate = useNavigate();
  const { categories } = useCategories();
  const { isLoggedIn, storeLogout } = useAuthStore();

  const handleClickLogoutButton = async () => {
    try {
      await logout();
      storeLogout();
      showAlert("로그아웃 되었습니다.");
      navigate(0);
    } catch (error) {
      showAlert("로그아웃 도중 오류가 발생했습니다.");
    }
  };

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
          {isLoggedIn ? (
            <>
              <li>
                <Link to="carts">장바구니</Link>
              </li>
              <li>
                <Link to="orders">주문내역</Link>
              </li>
              <li>
                <div
                  className="logout-button"
                  onClick={handleClickLogoutButton}
                >
                  <FaSignOutAlt />
                  로그아웃
                </div>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </nav>

      <ThemeSwitcher />
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
        .logout-button {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

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
