import React from "react";
import { useTheme } from "../../context/ThemeContext";
import lightSvg from "../../../public/light_mode.svg";
import darkSvg from "../../../public/dark_mode.svg";

function ThemeBtn() {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="inline-bock px-4 py-1 rounded-full "
    >
      {darkMode ? (
        <img width="25px" height="25px" src={lightSvg} />
      ) : (
        <img width="25px" height="25px" src={darkSvg} />
      )}
    </button>
  );
}

export default ThemeBtn;
