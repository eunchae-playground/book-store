import { Outlet, createBrowserRouter } from "react-router-dom";
import Error from "./components/common/Error";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
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
    ],
  },
]);

export default router;
