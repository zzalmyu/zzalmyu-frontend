import { useState, useEffect } from "react";
import { SunDim, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light",
  );

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme);
      const localTheme = localStorage.getItem("theme");
      document.querySelector("html")?.setAttribute("data-theme", localTheme || "light");
    }
  }, [theme]);

  return (
    <label className="grid cursor-pointer place-items-center">
      <div className="flex ">
        <input
          type="checkbox"
          value="synthwave"
          className="theme-controller toggle relative col-span-2 col-start-1 row-start-1 border-toggle-bg bg-toggle-center [--tglbg:theme(colors.toggle-bg)]"
          onChange={handleToggle}
          checked={theme === "light" ? false : true}
        />
        <div className="absolute flex w-auto items-center gap-2.5 px-1 py-1">
          <SunDim size={16} strokeWidth={2} color="white" aria-label="라이트 모드" />
          <Moon size={14} strokeWidth={2.2} color="white" aria-label="다크 모드" />
        </div>
      </div>
    </label>
  );
};

export default ThemeToggle;
