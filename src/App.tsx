import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { BookStoreThemeProvider } from "./context/themeContext";
import useVerifyLogin from "./hooks/useVerifyLogin";
import router from "./router";

const queryClient = new QueryClient();

function App() {
  useVerifyLogin();

  return (
    <QueryClientProvider client={queryClient}>
      <BookStoreThemeProvider>
        <RouterProvider router={router} />
      </BookStoreThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
