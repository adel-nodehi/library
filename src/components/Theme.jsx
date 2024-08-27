import { useState } from "react";

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
    <button onClick={handleThemeChange} className="theme-btn">
      <img src={isDark ? sun : moon} alt="theme icon" />
      <p>{isDark ? "Light Mode" : "Dark Mode"}</p>
    </button>
  );
}

export default Theme;
