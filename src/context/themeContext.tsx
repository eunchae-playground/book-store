import { ReactNode, createContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../style/global";
import { ThemeName, getTheme } from "../style/theme";

const DEFAULT_THEME_NAME: ThemeName = "light";
const THEME_LOCALSTOGRAGE_KEY = "book-store-theme";

interface State {
  themeName: ThemeName;
  toggleTheme: () => void;
}

export const state: State = {
  themeName: "light",
  toggleTheme: () => {},
};

export const ThemeContext = createContext<State>(state);

interface BookStoreThemeProviderProps {
  children: ReactNode;
}

export const BookStoreThemeProvider = ({
  children,
}: BookStoreThemeProviderProps) => {
  const savedThemeName = localStorage.getItem(
    THEME_LOCALSTOGRAGE_KEY
  ) as ThemeName | null;

  const [themeName, setThemeName] = useState<ThemeName>(
    savedThemeName || DEFAULT_THEME_NAME
  );

  const toggleTheme = () => {
    setThemeName(themeName === "light" ? "dark" : "light");
    localStorage.setItem(
      THEME_LOCALSTOGRAGE_KEY,
      themeName === "light" ? "dark" : "light"
    );
  };

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
