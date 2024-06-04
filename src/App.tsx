import { RouterProvider } from "react-router-dom";
import { BookStoreThemeProvider } from "./context/themeContext";
import useVerifyLogin from "./hooks/useVerifyLogin";
import router from "./router";

function App() {
  useVerifyLogin();

  return (
    <BookStoreThemeProvider>
      <RouterProvider router={router} />
    </BookStoreThemeProvider>
  );
}

export default App;
