import { Outlet, createBrowserRouter } from "react-router-dom";
import Error from "./components/common/Error";
import Layout from "./components/layout/Layout";
import BooksPage from "./pages/BooksPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignupPage from "./pages/SignupPage";

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
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "/books",
        element: <BooksPage />,
      },
    ],
  },
]);

export default router;
