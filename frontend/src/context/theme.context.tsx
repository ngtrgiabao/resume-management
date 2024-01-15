import { createContext, ReactNode, useState } from "react";

interface IThemeContext {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const defaultValues = {
  darkMode: false,
  toggleDarkMode: () => {},
};

export const ThemeContext = createContext<IThemeContext>(defaultValues);

interface IThemeContextProvider {
  children: ReactNode;
}

export const ThemeContextProvider = ({ children }: IThemeContextProvider) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const toggleDarkMode: () => void = () => {
    setDarkMode((darkMode) => !darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
