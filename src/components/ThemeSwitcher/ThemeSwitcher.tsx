"use client";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { themeState, toggleTheme } from "@/redux/themeReducer";

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
   const { theme } = useAppSelector(themeState);
   const dispatch = useAppDispatch();
   return (
      <Switch
         onClick={() => dispatch(toggleTheme())}
         title={theme === "light" ? " switch to dark" : " switch to light"}
      >
         {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </Switch>
   );
}
