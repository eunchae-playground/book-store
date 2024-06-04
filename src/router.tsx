import { Outlet, createBrowserRouter } from "react-router-dom";
import Error from "./components/common/Error";
import Layout from "./components/layout/Layout";
import Books from "./pages/Books";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout children={<Outlet />} />,
    errorElement: <Layout children={<Error />} />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/books",
        element: <Books />,
      },
    ],
  },
]);

export default router;
