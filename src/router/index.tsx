import { Outlet, createBrowserRouter } from "react-router-dom";
import Error from "../components/common/Error";
import Layout from "../components/layout/Layout";
import BookDetailPage from "../pages/BookDetailPage";
import BooksPage from "../pages/BooksPage";
import CartsPage from "../pages/CartsPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import SignupPage from "../pages/SignupPage";
import ProtectedRoute from "./helpers/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout children={<Outlet />} />,
    errorElement: <Layout children={<Error />} />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/signup",
        element: (
          <ProtectedRoute
            children={<SignupPage />}
            role="anonymousUser"
            redirectTo="/"
          />
        ),
      },
      {
        path: "/login",
        element: (
          <ProtectedRoute
            children={<LoginPage />}
            role="anonymousUser"
            redirectTo="/"
          />
        ),
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "/books",
        element: <BooksPage />,
      },
      {
        path: "/books/:bookId",
        element: <BookDetailPage />,
      },
      {
        path: "/carts",
        element: <ProtectedRoute children={<CartsPage />} role="loginUser" />,
      },
    ],
  },
]);

export default router;
