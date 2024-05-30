import { createContext, useContext, ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "@emotion/react";
import { theme } from "../assets/theme";

interface Theme {
  theme: typeof theme;
}

const ThemeContext = createContext<Theme>({
  theme: theme,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={{ theme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
