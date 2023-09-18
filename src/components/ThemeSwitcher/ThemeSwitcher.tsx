"use client";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import styled from "@emotion/styled";
import { useTheme } from "./ThemeProvider";

const Switch = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Switch
      onClick={toggleTheme}
      title={theme === "light" ? " switch to dark" : " switch to light"}
    >
      {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </Switch>
  );
}
