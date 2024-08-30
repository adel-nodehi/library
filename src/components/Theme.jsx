import { useState } from "react";
import Button from "./Button";

// Icons
import sun from "../assets/images/sun.svg";
import moon from "../assets/images/moon.svg";

function Theme() {
  const [isDark, setIsDark] = useState(false);

  function handleThemeChange() {
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }

    setIsDark((cur) => !cur);
  }

  return (
    <Button onClick={handleThemeChange}>
      <img src={isDark ? sun : moon} alt="theme icon" />
      <p>{isDark ? "Light Mode" : "Dark Mode"}</p>
    </Button>
  );
}

export default Theme;
