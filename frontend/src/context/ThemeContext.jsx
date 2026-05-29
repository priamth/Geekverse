import { createContext, useContext, useEffect, useState } from "react";

const THEMES = ["cyberpunk", "terminal", "modern"];
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("gv_theme") || "cyberpunk",
  );
  const [reduceMotion, setReduceMotion] = useState(
    () => localStorage.getItem("gv_reduce_motion") === "1",
  );
  const [compact, setCompact] = useState(
    () => localStorage.getItem("gv_compact") === "1",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.reduceMotion = reduceMotion ? "1" : "0";
    document.documentElement.dataset.compact = compact ? "1" : "0";
    localStorage.setItem("gv_theme", theme);
    localStorage.setItem("gv_reduce_motion", reduceMotion ? "1" : "0");
    localStorage.setItem("gv_compact", compact ? "1" : "0");
  }, [theme, reduceMotion, compact]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, themes: THEMES, reduceMotion, setReduceMotion, compact, setCompact }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
